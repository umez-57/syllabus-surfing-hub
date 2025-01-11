import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const title = formData.get('title')
    const type = formData.get('type')
    const department = formData.get('department')
    const credits = formData.get('credits')
    const description = formData.get('description')

    console.log('Received file upload request:', {
      title,
      type,
      department,
      credits,
      description,
      fileName: file?.name,
      fileType: file?.type,
      fileSize: file?.size
    })

    if (!file || !title || !type || !department) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: { file: !file, title: !title, type: !type, department: !department }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return new Response(
        JSON.stringify({ 
          error: 'Only PDF files are allowed',
          details: { providedType: file.type }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 400 
        }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Sanitize filename and generate storage path
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = sanitizedFileName.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    console.log('Uploading file to storage:', { filePath, sanitizedFileName })

    const { data: storageData, error: uploadError } = await supabase.storage
      .from('syllabi')
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to upload file to storage',
          details: uploadError 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      )
    }

    console.log('File uploaded successfully, inserting metadata')

    const { error: dbError } = await supabase
      .from('syllabi')
      .insert({
        title: title,
        type: type,
        department_id: department,
        credits: parseInt(credits as string),
        description: description,
        file_path: filePath,
        file_name: sanitizedFileName,
      })

    if (dbError) {
      // Clean up the uploaded file if database insert fails
      await supabase.storage
        .from('syllabi')
        .remove([filePath])

      console.error('Database insert error:', dbError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save file metadata',
          details: dbError 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      )
    }

    console.log('Upload completed successfully')

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully',
        data: {
          filePath,
          fileName: sanitizedFileName
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})
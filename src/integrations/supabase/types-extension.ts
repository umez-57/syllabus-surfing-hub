
import type { Database as OriginalDatabase } from './types';

// Extend the original Database type with missing tables
export interface ExtendedDatabase extends OriginalDatabase {
  public: {
    Tables: {
      // Include all original tables from the original Database type
      ...OriginalDatabase['public']['Tables'],
      
      // Add missing notes table
      notes: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          file_path: string;
          file_name: string;
          department_id: string | null;
          created_at: string | null;
          notes_by: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          file_path: string;
          file_name: string;
          department_id?: string | null;
          created_at?: string | null;
          notes_by?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          file_path?: string;
          file_name?: string;
          department_id?: string | null;
          created_at?: string | null;
          notes_by?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "notes_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          }
        ];
      };
      
      // Add missing pyqs table
      pyqs: {
        Row: {
          id: string;
          title: string;
          course_code: string;
          file_path: string;
          file_name: string;
          department_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          course_code: string;
          file_path: string;
          file_name: string;
          department_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          course_code?: string;
          file_path?: string;
          file_name?: string;
          department_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pyqs_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}

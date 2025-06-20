
# Patch Instructions for Project Issues

## FileManagement.tsx Fix
In `src/components/admin/FileManagement.tsx`, line 145, replace:

```typescript
queryClient.invalidateQueries(["syllabi"]);
```

with:

```typescript
queryClient.invalidateQueries({ queryKey: ["syllabi"] });
```

## FileUploadForm.tsx Fix
In `src/components/admin/FileUploadForm.tsx`, line 114, replace:

```typescript
queryClient.invalidateQueries(["syllabi"]);
```

with:

```typescript
queryClient.invalidateQueries({ queryKey: ["syllabi"] });
```

These changes align with the updated @tanstack/react-query API which requires an object with a queryKey property rather than passing the key directly as an array.

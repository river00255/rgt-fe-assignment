export const uploadImageFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`/api/upload/image`, {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};

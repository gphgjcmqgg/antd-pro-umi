export function getExt(fileName: string) {
  const ext = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
  if (ext === 'pdf') {
    return 'pdf';
  }
  if (ext === 'zip' || ext === 'tar' || ext === 'rar') {
    return 'zip';
  }
  if (ext === 'xls' || ext === 'xlsx') {
    return 'xls';
  }
  if (ext === 'ppt' || ext === 'pptx') {
    return 'ppt';
  }
  if (ext === 'doc' || ext === 'docx') {
    return 'word';
  }
  return 'common-type';
}
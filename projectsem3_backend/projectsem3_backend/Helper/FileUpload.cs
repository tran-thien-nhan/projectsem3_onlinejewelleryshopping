namespace projectsem3_backend.Helper
{
    public class FileUpload
    {
        static readonly string baseFolder = "Uploads/";
        static readonly string rootUrl = "http://localhost:5164/";

        public static string SaveImages(string folder, IFormFile image)
        {
            string imageName = Guid.NewGuid().ToString() + "_" + image.FileName;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"{baseFolder}\\{folder}");
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            var exactPath = Path.Combine(Directory.GetCurrentDirectory(), $"{baseFolder}\\{folder}", imageName);
            using (var fileSystem = new FileStream(exactPath, FileMode.Create))
            {
                image.CopyTo(fileSystem);
            }
            return rootUrl + baseFolder + folder + "/" + imageName;
        }

        public static void DeleteImage(string imageName)
        {
            string pathImage = imageName.Substring(rootUrl.Length);
            //var filePath = Path.Combine(pathImage);
            var filePath = Path.Combine(pathImage);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        public static string ProcessImageName(string imagePath)
        {
            if (imagePath == null)
            {
                return null;
            }

            int lastUnderscoreIndex = imagePath.LastIndexOf('_');
            if (lastUnderscoreIndex == -1 || lastUnderscoreIndex == imagePath.Length - 1)
            {
                // Không tìm thấy dấu '_' hoặc '_' ở cuối chuỗi, trả về chuỗi ban đầu
                return imagePath;
            }

            string name = imagePath.Substring(lastUnderscoreIndex + 1);
            return name;
        }
    }
}

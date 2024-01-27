using OfficeOpenXml;
using Org.BouncyCastle.Bcpg.Sig;
using projectsem3_backend.Repository;
using System.Globalization;

namespace projectsem3_backend.Service
{
    public class ExcelHandler : IExcelHandler
    {
        public ExcelHandler() // Hàm khởi tạo
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial; // Đăng ký phiên bản miễn phí
        }

        public async Task<byte[]> ExportToExcel<T>(List<T> data) where T : class, new() // T là kiểu dữ liệu của list
        {
            if (data == null || data.Count() == 0) // Kiểm tra dữ liệu
            {
                throw new Exception("Không có dữ liệu"); // Nếu không có thì throw exception
            }
            var stream = new MemoryStream(); // Tạo stream để lưu file excel

            using (var package = new ExcelPackage(stream)) // Tạo package excel
            {                
                var workSheet = package.Workbook.Worksheets.Add("Report"); // Tạo worksheet

                workSheet.Cells[1, 5].Style.Font.Bold = true; // In đậm

                T obj = new T(); // Tạo đối tượng mới để lấy tên các property

                var properties = obj.GetType().GetProperties(); // Lấy danh sách các property của đối tượng

                int posRow = 2; // Vị trí dòng đầu tiên để đổ dữ liệu

                // Đổ dữ liệu từ list vào excel
                for (int row = 0; row < data.Count(); row++) // Duyệt theo dòng
                {
                    for (int col = 0; col < properties.Count(); col++) // Duyệt theo cột
                    {
                        // Lấy dữ liệu của 1 dòng
                        var rowData = data[row];
                        // Gán giá trị cho ô
                        workSheet.Cells[posRow, col + 1].Value = rowData.GetType().GetProperty(properties[col].Name).GetValue(rowData);
                    }

                    posRow++; // Tăng vị trí dòng lên 1
                }

                // Đổ tên cột vào excel
                for (int i = 0; i < properties.Count(); i++) // Duyệt theo cột
                {
                    workSheet.Cells[1, i + 1].Value = properties[i].Name; // Gán giá trị cho ô
                    workSheet.Column(i + 1).AutoFit(); // Tự động chỉnh độ rộng cột
                }

                workSheet.Cells.LoadFromCollection(data, true); // Đổ dữ liệu từ list vào excel
                await package.SaveAsync(); // Lưu file excel

                await stream.CopyToAsync(stream); // Copy stream
            }

            //trả về stream
            return stream.ToArray();
        }

        public async Task<byte[]> ExportToExcelMultiSheet<T>(List<T> data, ExcelWorksheet worksheet) where T : class, new()
        {
            var updatedWorksheet = UpdateWorksheet(data, worksheet);
            return await SaveAndReturnExcelStream(updatedWorksheet);
        }

        private ExcelPackage CreatePackage()
        {
            return new ExcelPackage();
        }

        private ExcelWorksheet CreateWorksheet<T>(string sheetName, List<T> data) where T : class, new()
        {
            var package = CreatePackage();
            var worksheet = package.Workbook.Worksheets.Add(sheetName);
            return UpdateWorksheet(data, worksheet);
        }

        private ExcelWorksheet UpdateWorksheet<T>(List<T> data, ExcelWorksheet worksheet) where T : class, new()
        {
            if (data == null || !data.Any())
            {
                throw new Exception("Không có dữ liệu");
            }

            T obj = new T();
            var properties = obj.GetType().GetProperties();

            int posRow = 2;

            for (int row = 0; row < data.Count(); row++)
            {
                for (int col = 0; col < properties.Count(); col++)
                {
                    var rowData = data[row];
                    worksheet.Cells[posRow, col + 1].Value = rowData.GetType().GetProperty(properties[col].Name).GetValue(rowData);
                }

                posRow++;
            }

            for (int j = 0; j < properties.Count(); j++)
            {
                worksheet.Cells[1, j + 1].Value = properties[j].Name;
                worksheet.Column(j + 1).AutoFit();
            }

            worksheet.Cells.LoadFromCollection(data, true);

            return worksheet;
        }

        private async Task<byte[]> SaveAndReturnExcelStream(ExcelWorksheet worksheet)
        {
            var excelStream = new MemoryStream();
            using (var package = CreatePackage())
            {
                var newWorksheet = package.Workbook.Worksheets.Add("Sheet");
                newWorksheet.Cells[1, 1].LoadFromCollection(new List<string> { "Test" });
                await package.SaveAsAsync(excelStream);
            }

            excelStream.Seek(0, SeekOrigin.Begin);
            return excelStream.ToArray();
        }
    }
}

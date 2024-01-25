using OfficeOpenXml;

namespace projectsem3_backend.Repository
{
    public interface IExcelHandler
    {
        Task<byte[]> ExportToExcel<T>(List<T> data) where T : class, new();

        Task<byte[]> ExportToExcelMultiSheet<T>(List<T> data, ExcelWorksheet worksheet) where T : class, new();
    }
}

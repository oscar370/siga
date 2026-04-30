using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SigaBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTotalAmountName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Sales",
                newName: "TotalRevenue");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Purchases",
                newName: "TotalCost");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalRevenue",
                table: "Sales",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "TotalCost",
                table: "Purchases",
                newName: "TotalAmount");
        }
    }
}

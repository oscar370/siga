using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SigaBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLotConcurrencyXmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowVersion",
                table: "Lots");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "xmin",
                table: "Lots");

            migrationBuilder.AddColumn<byte[]>(
                name: "RowVersion",
                table: "Lots",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}

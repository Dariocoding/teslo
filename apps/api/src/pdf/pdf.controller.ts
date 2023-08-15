import { Controller, Post, Res, Body } from "@nestjs/common";
import { PdfService } from "./pdf.service";
import { ApiTags } from "@nestjs/swagger";
import PDFDocument from "pdfkit-table";
import { GenerarPdfType } from "@teslo/interfaces";
import { Response } from "express";

type Table = Parameters<PDFDocument["table"]>[0];

@Controller("pdf")
@ApiTags("Export Service")
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post("/table")
  async generarExcel(@Res() res: Response, @Body() body: GenerarPdfType) {
    const { name: title, headers, rows } = body;
    const doc = new PDFDocument({
      size: "A4",
      margin: 10,
    });
    const buffers = [];

    const table: Table = { title, headers, rows };

    await doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) =>
        doc.font("Helvetica").fontSize(7),
      padding: [5],
    });

    doc.end();

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-disposition": "attachment; filename=table.pdf",
        })
        .end(pdfData);
    });
  }
}

<template>
  <div>
    <h1 id="print">Kamol Rakhimov</h1>
    <button type="button" @click="print()">click me</button>
  </div>
</template>

<script>
export default {
  methods: {
    print() {
      const prtHtml = document.getElementById("print").innerHTML;

      // Get all stylesheets HTML
      //   let stylesHtml = "";
      //   for (const node of [
      //     ...document.querySelectorAll('link[rel="stylesheet"], style'),
      //   ]) {
      //     stylesHtml += node.outerHTML;
      //   }

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,toolbar=0,scrollbars=0,status=0"
      );

      WinPrint.document.write(
        `<!DOCTYPE html>
        <html>
        <head>
             <style lang="css">
                @page {
                    size: A2;
                    margin: 200;
                }
                @media print {
                    html, body {
                        width: 210mm;
                        height: 297mm;
                    }
                }
            </style>
        </head>
        <body>
        ${prtHtml}
        </body> 
        </html>
       `
      );

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      //   WinPrint.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>

module.exports = ({
  username,
  school_name,
   mainform,
   headform,
  table_one,
  table_two,
  sign
}) => {
  const today = new Date();
  return `
  <!DOCTYPE html>
  <html lang="ar" dir="rtl">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>خطة الدرس</title>
  </head>
  <style>
p, h3{
    display: flex;
    justify-content: center;
}
.highlight{
    display: inline-block;
    padding: .25em 0;
    background: rgb(255, 255, 0);
    color: #000000;
    font-size: large;
}

body
{font-family:"Traditional Arabic";
}

.container{
    display: flex;
    justify-content: center;
}

li{
    list-style-type: none;
    margin-bottom: 20px;
}
.row{
   display: inline-block;
}


</style>      
     <body>
     <p style="text-align: center; display: flex; justify-content: center;"><strong>بسم الله الرحمن الرحيم</strong></p>
  <p style="text-align: center; margin-bottom: -23px; margin-top: -23px;"><img width="120" src="https://www.kilanigroup.com/sites/default/files/2019-08/bdf9e39a855f268ee49e686706c6d812.png" alt="pic"/></p>
  <p style="text-align: center;">إدارة التدريب والتأهيل والإشراف التربوي</p>
  <p style="text-align: center;">مديرية الإشراف التربوي</p>
  <p style="text-align: center;">&nbsp;</p>
  <p style="text-align: center; margin-top: -23px;"><strong class="highlight">دفتر تخطيط الدروس</strong></p>
     
  <div style="display: flex; justify-content: center;">
    <div class="row" style="margin-right: 15rem; margin-top: 23px;">
        <li><span style="font-weight: bold;">اسم المعلم/ المعلمة :</span> ${username}</li>
        <li><span style="font-weight: bold;">المبحث / المباحث التي يدرسها : </span> ${mainform.materials}</li>
        <li><span style="font-weight: bold;">الصفوف والشعب : </span> ${mainform.classes}</li>
    </div>
    <div class="row" style="margin-right: 23px">
    <li><span style="font-weight: bold;">اسم المدرسة :</span> ${school_name}</li>
    <li><span style="font-weight: bold;">اسم المديرية :  </span> مديرية التربية والتعليم لمنطقة ${mainform.gov} </li>
    <li><span style="font-weight: bold;">العام الدراسي : </span>2022/2023 <span style="font-weight: bold;">، الفصل :</span> ${mainform.studyYear}</li>
    </div>
    </div>
  <h3 style="text-align: center; margin-top: 3rem;">خطة الدرس</h3>

    <p style="direction: rtl;">الصف / المستوى : ${headform.level}.&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; المبحث : ${headform.materialType}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; عنوان الوحدة : ${headform.unit}.&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; عنوان الدرس : ${headform.lessonName}.</p>
    <p style="direction: rtl;">عدد الحصص : ${headform.lessonsCount}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; التاريخ : من :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${headform.dataFrom}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; إلى :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${headform.dataTo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>


    <table style="direction: rtl; width: 740.8px; border-color: black; margin-left: auto; margin-right: auto;" border="5" cellspacing="2" cellpadding="2">
<tbody>
   <tr style="height: 35px;">
<td style="width: 47.9375px; height: 70px; text-align: center;" rowspan="2">
            <p><strong>الرقم</strong></p>
         </td>
         <td style="width: 96.875px; height: 70px; text-align: center;" rowspan="2">
            <p><strong>النتاجات الخاصة</strong></p>
         </td>
         <td style="width: 167.762px; height: 70px; text-align: center;" rowspan="2">
            <p><strong>المواد والأدوات والتجهيزات </strong></p>
            <p><strong>( مصادر التعلم )</strong></p>
         </td>
         <td style="width: 83.925px; height: 70px; text-align: center;" rowspan="2">
            <p><strong>استراتيجيات التدريس</strong></p>
         </td>
         <td style="width: 149.038px; height: 35px; text-align: center;" colspan="2">
            <p><strong>التقويم</strong></p>
         </td>
         <td style="width: 160.863px; height: 35px; text-align: center;" colspan="2">
            <p><strong>التنفيذ *</strong></p>
         </td>
         </tr>
         <tr style="height: 35px; text-align: center;">
         <td style="width: 83.925px; height: 35px;">
            <p><strong>الإستراتيجية</strong></p>
         </td>
         <td style="width: 59.9125px; height: 35px; text-align: center;">
            <p><strong>الأداة</strong></p>
         </td>
         <td style="width: 100.887px; height: 35px; text-align: center;">
            <p><strong>الإجراءات </strong></p>
         </td>
         <td style="width: 54.775px; height: 35px; text-align: center;">
         <p style="direction: rtl;"><strong>الزمن</strong></p>
   </td>
   </tr>
${table_one.map((row) => {
  return `
   <tr>
   <td width="48">
      <p><strong>&nbsp;${row.num}</strong></p>
   </td>
   <td width="97">
      <p>&nbsp;${row.results}</p>
   </td>
      <td width="168">
            <p>&nbsp;${row.tools}</p>
         </td>
            <td width="84">
            <p>&nbsp;${row.strategies}</p>
         </td>
            <td width="84">
            <p>&nbsp;${row.tq}</p>
         </td>
         <td width="60">
            <p>&nbsp;${row.tqTool}</p>
         </td>
         <td width="101">
            <p>&nbsp;${row.toDo}</p>
            </td>
         <td width="54">
            <p>&nbsp;${row.wq}</p>
      </td>
</tr>
 
   `
})}
</tbody>
</table>



<table style="border-color: black; margin-left: auto; margin-right: auto;" border="5" width="740.8" cellspacing="2" cellpadding="2">
   <caption>
         <h2><strong>(جدول المتابعة اليومي)</strong></h2>
   </caption>
   <tbody>
        <tr>
        <td width="108" style="text-align: center;">
         <p><strong>اليوم والتاريخ</strong></p>
         </td>
        <td width="96" style="text-align: center;">
         <p><strong>الشعبة</strong></p>
         </td>
        <td width="96" style="text-align: center;">
         <p><strong>الحصة</strong></p>
         </td>
        <td width="120" style="text-align: center;">
         <p><strong>النتاجات المتحققة</strong></p>
         </td>
        <td width="277" style="text-align: center;">
         <p><strong>الواجب البيتي</strong></p>
         </td>
        </tr>

${table_two.map((row) => {
  return `
   <tr style="text-align: center;">
      <td width="160">
         <p style="direction: rtl;">&nbsp;${row.datte}, ${row.day}</p>
         </td>
         <td width="96">
         <p>&nbsp;${row.section}</p>
         </td>
         <td width="96">
         <p>&nbsp;${row.classLesson}</p>
         </td>
         <td width="120">
         <p>&nbsp;${row.achivedResults}</p>
         </td>
         <td width="230">
         <p>&nbsp;${row.hw}</p>
      </td> 
   </tr>`;
})}
</tbody>
</table>
<span style="font-size:15.0pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;توقيع
مدير/ة المدرسة
:<img src="${sign}" width="60" height="50" alt="sign"/></span>

</body>
    </html>
    `;
};

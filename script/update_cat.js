function updateLevel(level) {
    document.getElementById('level_mmrc1').value = level;
    document.getElementById('level_mmrc2').value = level;
    document.getElementById('level_mmrc3').value = level;
    document.getElementById('level_mmrc4').value = level;
    document.getElementById('level_mmrc5').value = level;
    // level_CAT
  }

  function updateLevelCAT(levels) {
    document.getElementById('cat_detail0').value = levels;
    document.getElementById('cat_detail1').value = levels;
  }

  function submitForm() {
    // ปิดการใช้งานปุ่มหลังจากคลิก
    document.getElementById('submitButton').disabled = true;

    var form = document.getElementById('myForm');
    var formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbxm8t-gawuwewsgHWRvC-UKSURjVu5ehAQACdbqefMHLe4UoUPF4_iYaTZla3NsIufmgQ/exec', {
      method: 'POST',
      body: new URLSearchParams(formData)
    })
      .then(response => response.text())
      .then(data => {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'ฟอร์มของคุณถูกส่งแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          // Redirect to another HTML page after successful form submission
          window.location.href = 'selectForm.html'; // Replace 'success.html' with the actual URL of your target page
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถส่งฟอร์มได้',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
        // เปิดการใช้งานปุ่มอีกครั้งในกรณีที่มีข้อผิดพลาด
        document.getElementById('submitButton').disabled = false;
      });
  }
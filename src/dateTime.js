const DateTime = () => {
  const dateTimePicker = document.createElement('div');
  dateTimePicker.innerHTML = `
<form class ='form-group'>
    <div class='input-group date' id='datetimepicker1'>
            <input type='text' placeholder='Due Date' class="cal-val form-control" data-date='due' />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div> 
            <script type="text/javascript">
            
            </script>`;
  return dateTimePicker;
};

export { DateTime };

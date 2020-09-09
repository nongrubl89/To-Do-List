const DateTime=()=>{

const dateTimePicker = document.createElement('div');
dateTimePicker.innerHTML=
`

<form class ='form-group'>
<div class='col-sm-3'>
    <div class='input-group date' id='datetimepicker1'>
            <input type='text' id ='due' placeholder='Due Date' value='' class="form-control" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div> 
            <script type="text/javascript">
            </script>`
return dateTimePicker;

}            

export {DateTime}
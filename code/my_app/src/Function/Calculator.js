import React,{useState} from "react";
function Calculator(){
    const[value,setvalue]=useState("");
   const data=(d)=>{
   let num=value;
   num=num+d;
    setvalue(num);
   }
   const result=()=>{
    
   // let res=JSON.parse(value.trim());
   try{
    let res=eval(value);
    console.log(res);
    setvalue(res);
   }
   catch{
    setvalue("Invalid Expression");
   }
   }
    return(<>
    
    <div className="containar">
        <p style={{textAlign:"center",margin:"15px",fontSize:"30px"}}>CALCULATOR</p>
        <table >
            <tr>
        <td colspan="3" style={{padding:"0px",backgroundColor:"#6c8ba72d"}}><input type="text" style={{width:"215px",borderStyle:"none",outlineStyle:"none",fontSize:"23px",padding:"0px",height:"81px",backgroundColor:"#6c8ba72d"}} 
        value={value}
        
        /></td>
        <td onClick={()=>{setvalue("")}} >clr</td>
   
            </tr>
            <tr>
                <td onClick={()=>{data(1)}}>1</td>
                <td onClick={()=>{data(2)}}>2</td>
                <td onClick={()=>{data(3)}}>3</td>
                <td onClick={()=>{data("+")}}>+</td>
            </tr>
            <tr>
                <td onClick={()=>{data(4)}}>4</td>
                <td onClick={()=>{data(5)}}>5</td>
                <td onClick={()=>{data(6)}}>6</td>
                <td onClick={()=>{data('-')}}>-</td>
            </tr>
            <tr>
                <td onClick={()=>{data(7)}}>7</td>
                <td onClick={()=>{data(8)}}>8</td>
                <td onClick={()=>{data(9)}}>9</td>
                <td onClick={()=>{data("*")}}>*</td>
            </tr>
            <tr>
                <td onClick={()=>{data(0)}}>0</td>
                <td onClick={()=>{data(".")}}>.</td>
                <td onClick={()=>{data("/")}}>/</td>
                <td onClick={result}>=</td>
            </tr>
        </table>
    </div>
    </>)
}
export default Calculator;
import React, { useRef } from 'react'
import {Button, Image} from 'antd'
import { useReactToPrint } from 'react-to-print';
import icon from '../../assets/images/logo.png'
import ReactToPdf from 'react-to-pdf'


const ViewPrintInvoice = () => {
    const componentToPrint = useRef();
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };

    const handlePrint = useReactToPrint({
        content: () => componentToPrint.current,
      });

    return (
    <div>
        <ReactToPdf targetRef={componentToPrint} filename="dowload.pdf" 
        // options={options} x={.5} y={.5} scale={0.8}
        onComplete = {() => console.log({})}
        >
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </ReactToPdf>
        <Button onClick={handlePrint}>Print this out!</Button>
        <div
        style={{
            height:"100vh",
            width:"100vh",
        }}
         ref={componentToPrint}>
            
            viewPrintInvoice
            <div style={{ 
            width : "100vh",
            background : "yellow" }} >
                        <Image src ={icon} preview ={false} />
            </div>
        </div>
    </div> 
  )
}

export default ViewPrintInvoice
/**
 * @author WMXPY
 * @overview generated by ghoti-cli
 * @fileoverview Page set show
 */

import * as React from 'react';

import Config from '../../config/config';

import { IItem, IPage } from './interface';

import * as fs from 'fs';
import * as path from 'path';
import logo from './logo';
import rlogo from './repairbaseLogo';

// export type TMode = 'invoice' | 'workorder';
export type TMode = 'invoice' | 'workorder'|"bid";

export interface IProps {
    page: IPage;
    mode: TMode;
    updatePage?: (page: IPage) => void;
    upgradeMode?: (mode: TMode) => void;
    noPicture?: boolean;
    isPrint?: boolean;
}


/**
         * FOR MAINTAINER
         * MAKE SURE THIS part is not editable
         */
const s = {
    td: {
        border: '1px solid black',
    },
    th: {
        textAlign: 'center',
        border: '1px solid black',
    },
    div: {
        padding: '3px',
    },
    entireDiv: {
        border: '1px solid black',
    },
    topDiv: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tdInvisable: {
        border: '1px solid black',
    },
    lowDiv: {

    },
};

class Show extends React.Component<IProps> {
    public constructor(props) {
        super(props);
        this.mapItem = this.mapItem.bind(this);
        this.change = this.change.bind(this);
        this.showBaseLogo = this.showBaseLogo.bind(this);
        this.displayT = this.displayT.bind(this);
        this.changeStage = this.changeStage.bind(this);
        this.billChange = this.billChange.bind(this);
        this.taxChange = this.taxChange.bind(this);

    }

    public render(): JSX.Element {
        let tax: number = 0;
        let taxTotal: number = 0;
        let total: number = 0;
        for (let i of this.props.page.item) {
            total += (i.amount ? i.amount : 0);
            if (i.taxable) {
                taxTotal += (i.amount ? i.amount : 0);
            }
        }
        tax = taxTotal * (this.props.page.tax ? this.props.page.tax : 0) * 0.01;
        total += tax;

        return (<div>
            {this.props.isPrint ? void 0 : <button
                style={{
                    width: '30px',
                    height: '25px',
                }}
                onClick={this.change} title="change status">
                <i className="far fa-bell"></i>
            </button>}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100px',
                //backgroundColor: this.state.mode === 'invoice' ? 'red' : 'blue',
                alignItems: 'center',
            }}>
                <div style={{
                    flex: 1,
                    paddingLeft: '10px',
                    paddingTop: '20px',
                    display: 'inline',
                    fontSize: '20px',
                    color: 'darkblue',
                    fontWeight: 'bold',
                }}>
                <div>
                    {this.showBaseLogo()}
                    </div>
                </div>
                
                <div id="text status" style={{
                    width: '30%',
                    fontSize: '45px',
                    fontWeight: 'bold',
                    color: 'lightblue',
                    textAlign: 'center',

                }}>{this.changeStage()}</div>
                
            </div>
            <div style={{ 
                display: 'flex',
                
                }}>
                
                <img src={logo} alt="logo" style={{
                    width: '70px',
                    height: '60px',
                }} />
                
                <div style={{ flex: 3,
                    paddingLeft:'10px' ,
                
                }}>
                <div style={{
                    flex: 1,
                    paddingTop:'20px',
                    display: 'inline',
                    fontSize: '20px',
                    color: 'darkblue',
                    fontWeight: 'bold',
                }}>
                    Document Presented by<br/>
                    Repair and Preservation Network, LLC<br/>
                </div>
                    10 Old Mamaroneck Road Unit 1A.<br />
                    White Plains, NY 10605<br />
                    Phone: (646)-568-0008
                    
                </div>
                <div style={{ flex: 2 }}>
                    {this.displayT()}
                </div>
            </div>
            <table style={{
                width: '100%',
                border: '3px solid black',
                marginTop: '15px',
                borderCollapse: 'collapse',
            }}>
                <thead>
                    <tr style={{ border: '3px solid black' }}>
                        <th style={{ ...(s.th as any), width: "66%" }}>{this.billChange()}</th>
                        <th style={(s.th as any)}>ADDRESS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ width: "66%", border: '1px solid black', padding: '5px' }}>{this.props.page.billTo.split('\n').map((value, index) => {
                            return <div key={index}>{value}</div>;
                        })}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>{this.props.page.address.split('\n').map((value, index) => {
                            return <div key={index}>{value}</div>;
                        })}</td>
                    </tr>

                </tbody>
            </table>
            <table style={{
                width: '100%',
                border: '1px solid black',
                marginTop: '15px',
                borderCollapse: 'collapse',
            }}>
                <thead>
                    <tr>
                        <th style={{ ...(s.th as any), width: "80%", ...s.td }}>ITEM</th>
                        <th style={{ ...s.td, ...(s.th as any) }}>AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.page.item.map(this.mapItem)}
                    {this.taxChange(tax)}
                    
                    <tr>
                        <td style={(s.td as any)}>
                            <div style={{
                                padding: '3px',
                                display: 'flex',
                            }}>
                                <div style={{ flex: 1, textAlign: 'center' }}>Thank you for your bussiness</div>
                                <div style={{
                                    fontWeight: 'bold',
                                }}>Total</div>
                            </div>
                        </td>
                        <td style={{
                            ...(s.td as any),
                            padding: '3px',
                            fontWeight: 'bold',
                        }}>
                            <div style={{ display: 'flex' }}>
                                <div>$</div>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    {total ? total.toFixed(2) : 0}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{
                textAlign: 'center',
                backgroundColor: 'lightblue',
                marginTop: '15px',
            }} className="div-footer">
                <div>If you have any questions about this invoice, please contact us at:</div>
                <a href="mail: info@rpncomplany.com">info@rpncompany.com</a>
            </div>
        </div >);
    }

    protected taxChange(tax){
        if(this.props.mode!=='workorder'){
            return(
                <tr>
                        <td style={(s.td as any)}>
                            <div style={{
                                padding: '3px',
                            }}>
                                HOA: Sales tax {this.props.page.tax ? this.props.page.tax : 0}%
                            </div>
                        </td>
                        <td style={{
                            ...(s.td as any),
                            padding: '3px',
                            fontWeight: 'bold',
                        }}>
                            <div style={{ display: 'flex' }}>
                                <div>$</div>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    {tax ? tax.toFixed(2) : 0}
                                </div>
                            </div>
                        </td>
                    </tr>
            );
        }
    }
    protected billChange(){
        if(this.props.mode==='invoice'){
            return ("BILL TO");
        }
        else if(this.props.mode==='workorder'){
            return ("UPLOAD LINK");
        }
        else{
            return ("NOTE");
        }
    }

    protected parseDate(da: string | Date): string {
        let year: string;
        let month: string;
        let day: string;
        if (da instanceof Date) {
            year = da.getFullYear().toString();
            month = (da.getMonth() + 1).toString();
            day = da.getDate().toString();
        } else {
            let parsed: string[] = da.split('-');
            if (parsed.length < 3) {
                return da;
            }
            year = parsed[0];
            month = parsed[1];
            day = parsed[2];
        }
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return `${month}/${day}/${year}`;
    }
    protected showBaseLogo(){
        if(this.props.mode==='bid'){
            return (<img src={rlogo} alt="logo" style={{
                width: 'auto',
                height: '80px',
            }} />);
        }
    }

    protected base64_encode(file: string): string {
        /**
         * FOR MAINTAINER
         * if this.props.isprint means use is printing this page who have full access to file:// protocol
         * If not, read the file ourself and return as base64 string
         */
        if (file.substring(0, 4) === 'http') return file
        if (file.length < 1) {
            return '';
        }

        if (this.props.isPrint) {
            return file;
        }

        let extensionName: string = path.extname(file);
        let bitmap: Buffer;

        /**
         * FOR MAINTAINER
         * This is a bad practice, use sync reading will cause big picture load stuck render thread.
         * ToFIXIT: Fix it by use async reading function, but be aware user may add picture again dring async reading, make sure to disable upload button during async file reading.
         */
        try {
            bitmap = fs.readFileSync(file);
        } catch (err) {
            return '';
        }
        let base64Image: string = new Buffer(bitmap).toString('base64');
        let imgSrcString: string = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
        return imgSrcString;
    }
    protected change() {
        // this.props.upgradeMode(this.props.mode === 'invoice' ? 'workorder' : 'invoice');
        //var judge;
        if(this.props.mode === 'invoice'){
            this.props.upgradeMode('workorder');
        }
        else if(this.props.mode === 'workorder'){
            this.props.upgradeMode('bid')
        }
        else{
            this.props.upgradeMode('invoice');
        }
        console.log(this.props.mode);
    }

    protected changeStage(){
        if(this.props.mode === 'invoice'){
            return("INVOICE");
        }
        else if(this.props.mode === 'workorder'){
            return("WORK ORDER");
        }
        else{
            return("BID");
        }
    }

    protected displayT() {
        
        if (this.props.mode === 'invoice') {
            return (<table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <tr>
                        <td style={(s.td as any)}>
                            Invoice Number
                    </td>
                        <td style={(s.td as any)}>
                        {this.props.page.invoice.split('\n').map((value, index) => {
                            return <div key={index}>{value}</div>;
                        })}
                        </td>
                    </tr>
                    <tr>
                        <td style={(s.td as any)}>
                            Completion Date
                    </td>
                        <td style={(s.td as any)}>
                            {this.parseDate(this.props.page.completionDate)}
                            
                        </td>

                    </tr>
                    <tr>
                        <td style={(s.td as any)}>
                            Invoice Date
                    </td>
                        <td style={(s.td as any)}>
                            {this.parseDate(this.props.page.invoiceDate)}
                            
                        </td>
                    </tr>
                </tbody>
            </table>);
        }
        else if(this.props.mode==='bid'){
        }
        else{
                return (<table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={(s.td as any)}>
                                Key Code/
                                Lock Box Number
                        </td>
                            <td style={(s.td as any)}>
                            {this.props.page.invoice.split('\n').map((value, index) => {
                            return <div key={index}>{value}</div>;
                        })}
                            </td>
                        </tr>
                        <tr>
                            <td style={(s.td as any)}>
                                Completion Date
                        </td>
                            <td style={(s.td as any)}>
                                {this.parseDate(this.props.page.completionDate)}
                                
                            </td>
    
                        </tr>
                        <tr>
                            <td style={(s.td as any)}>
                                Invoice Date
                        </td>
                            <td style={(s.td as any)}>
                                {this.parseDate(this.props.page.invoiceDate)}
                                
                            </td>
                        </tr>
                    </tbody>
                </table>);
        }
        return void 0;
    }
    

    protected mapItem(value: IItem, index: number): JSX.Element {
        let count = 0;
        const mapPicture = (picture: string, pictureIndex: number) => {
            if (!picture) {
                return void 0;
            }
            return (<div key={pictureIndex} style={{
                flex: 1,
                position: 'relative',
                // minWidth: '33%',
                minWidth: '180px',
                maxWidth: '180px',
                padding: '2px',
                //marginLeft:'20px',
                //marginTop:'0px',
            }} >
                <img
                    style={{
                        // position: 'static',
                        width: '95%',
                        height: 'auto',
                        marginLeft:'3px',
                        //marginTop:'0px',
                        border: '1px solid black',
                    }}
                    src={this.base64_encode(picture)}
                />
                <div>{this.props.isPrint? void 0: ++count}</div>
                
            </div>);
        };

        const buildPicture = (pictureE: string[]) => {
           
            const picture = [...pictureE];
            let pictureList: any[] = [];
            let tempList: string[] = [];
            let key: number = 0;
            while (picture.length > 0) {
                /**
                 * FOR MAINTAINER
                 * FOR KEY! this is a bad practice, due to key change, the entire component list may rendered again due to small change.
                 * TOFIXIT: use individual key value.
                 */
                if (tempList.length >= 3) {
                    pictureList.push(<tr key={key++}>
                        <td style={(s.tdInvisable as any)} colSpan={2}>
                            <div style={s.div}>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                }}>{tempList.map(mapPicture)}</div>
                            </div>
                        </td>
                    </tr>);
                    tempList = [];
                }
                tempList.push(picture.shift());
            }
            if (tempList.length > 0) {
                pictureList.push(<tr key={key}>
                    <td style={(s.tdInvisable as any)} colSpan={2}>
                        <div style={s.div}>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}>{tempList.map(mapPicture)}</div>
                        </div>
                    </td>
                </tr>);
            }
            return pictureList;
        };

        if (this.props.noPicture) {
            return (<tr key={index}>
                <td style={(s.td as any)}>
                    <div style={{
                        padding: '3px',
                    }}>{index + 1}.&nbsp;{value.description}</div>
                </td>
                <td style={{
                    ...(s.td as any),
                    padding: '3px',
                    fontWeight: 'bold',
                }}>
                    <div style={{ display: 'flex' }}>
                        <div>$</div>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                            {value.amount ? value.amount.toFixed(2) : 0}
                        </div>
                    </div>
                </td>
            </tr>);
        }

        return (<React.Fragment key={index}><tr>
            <td style={(s.td as any)}>
                <div style={{
                    padding: '3px',
                }}>{index + 1}.&nbsp;{value.description}</div>
            </td>
            <td style={{
                ...(s.td as any),
                padding: '3px',
                fontWeight: 'bold',
            }}>
                <div style={{ display: 'flex' }}>
                    <div>$</div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                        {value.amount ? value.amount.toFixed(2) : 0}
                    </div>
                </div>
            </td>
        </tr>
            {value.before.length > 0 ?
                <React.Fragment>
                    <tr>
                        <td style={(s.topDiv as any)} colSpan={2}>Before</td>
                    </tr>
                    {buildPicture(value.before)}
                </React.Fragment>
                : void 0}
            {value.during.length > 0 ?
                <React.Fragment>
                    <tr>
                        <td style={(s.topDiv as any)} colSpan={2}>During</td>
                    </tr>
                    {buildPicture(value.during)}
                </React.Fragment>
                : void 0}

            {value.after.length > 0 ?
                <React.Fragment>
                    <tr>
                        <td style={(s.topDiv as any)} colSpan={2}>After</td>
                    </tr>
                    {buildPicture(value.after)}
                </React.Fragment>
                : void 0}
        </React.Fragment>);
    }
}

export default Show;

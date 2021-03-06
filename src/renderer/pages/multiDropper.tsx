/**
 * @author WMXPY
 * @overview generated by ghoti-cli
 * @fileoverview Component set Dropper
 */

import * as React from 'react';

import DropZone from 'react-dropzone';
import Config from '../../config/config';

import * as fs from 'fs';
import * as path from 'path';

export interface IProps {
    onDrop: (paths: string[]) => void;
    load?: string;
    children?: any;
}

class multiDropper extends React.Component<IProps, {}> {
    public constructor(props) {
        super(props);
        this.addMultiPhoto = this.addMultiPhoto.bind(this);
    }

    public render() {
        return (
            <DropZone
                title="add pictures"
                onDrop={this.addMultiPhoto}
                width={150}
                height={100}
                className="drag-in">
                {this.props.load ? <i className="fas fa-image"></i> : <i className="far fa-image"></i>}
            </DropZone>);
    }

    protected addMultiPhoto(acceptedFiles: File[], rejectedFiles) {
        if (acceptedFiles.length > 0) {
            this.props.onDrop(acceptedFiles.map((value: any) => {
                return value.path;
            }));
       

        }
    }

}

export default multiDropper;

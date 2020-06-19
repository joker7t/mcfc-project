import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileUploader from 'react-firebase-file-uploader';

import { firebase } from '../../firebase';

const Fileuploader = ({ defaultImg, defaultImgName, tag, dir, storeImage, resetImage }) => {
    const [name, setName] = useState('');
    const [isUploading, setIsuploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        const load = async () => {
            if (defaultImg) {
                setName(defaultImgName);
                const url = await firebase.storage().ref(dir).child(defaultImg).getDownloadURL();
                console.log(url);
                setFileUrl(url);
            }
        }

        load();
    });

    const handleUploadStart = () => {
        setIsuploading(true);
    }

    const handleUploadError = () => {
        setIsuploading(false);

    }

    const handleUploadSuccess = async (filename) => {
        setIsuploading(false);
        setName(filename);
        const url = await firebase.storage().ref(dir).child(filename).getDownloadURL();
        setFileUrl(url);
        storeImage(filename);
    }

    const uploadAgain = async (filename) => {
        setFileUrl('');
        resetImage();
    }

    return (
        <div>
            {!fileUrl ?
                <div>
                    <div className='label_inputs'>
                        {tag}
                    </div>
                    <FileUploader
                        accept='images/*'
                        name='image'
                        randomizeFilename
                        storageRef={firebase.storage().ref(dir)}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                    />
                </div>
                :
                <div className='image_upload_container'>
                    <img
                        style={{
                            width: '300px',
                            maxWidth: '50%'
                        }}
                        src={fileUrl}
                        alt={name}
                    />
                    <div className='remove' onClick={uploadAgain}>
                        Remove
                    </div>
                </div>
            }
            {isUploading ?
                <div className='progress' style={{ textAlign: 'center', margin: '30px 0' }}>
                    <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
                </div>
                :
                <div>

                </div>
            }
        </div>
    );
}

export default Fileuploader;

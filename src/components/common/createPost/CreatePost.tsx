import React, { ChangeEvent, useRef } from 'react'
import { useEffect, useState, } from 'react';
import { ITweetCreate, IUploadImage, IUploadImageResult } from '../../profile/types';
import { formHttp } from '../../../http';
import { useFormik } from "formik";
import * as yup from "yup";
import { APP_ENV } from '../../../env';
import './createPost.css';
import { Modal } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const CreatePost = (props: any) => {
    const [gridColumns, setGridColumns] = useState<string>();
    const [gridRows, setGridRows] = useState<string>();
    const [images, setImages] = useState<IUploadImageResult[]>([]);
    const [disableImages, setDisableImages] = useState<boolean>(false);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);

    const container = useRef<HTMLDivElement>(null);
    const btn = useRef<HTMLButtonElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        console.log(container);
        if (container.current && !container.current.contains(event.target as Node) && btn.current && !btn.current.contains(event.target as Node)) {
            setShowEmoji(false);
        }
    }

    useEffect(() => {

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [container]);



    const setGrid = () => {
        console.log(images.length);
        switch (images.length) {
            case 0:
                setGridColumns("1fr");
                setGridRows("1fr");
                break;
            case 1:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 2:
                setGridColumns("1fr 1fr");
                setGridRows("1fr");
                break;
            case 3:
                setGridColumns("1fr 1fr");
                setGridRows("1fr 1fr");
                break;
            default:
                break;
        }
    }

    const initValues: ITweetCreate = {
        tweetText: "",
        mediaIds: [],
        repostedId: null,
        postTime: null,
        timeZone: "0"
    };

    const createSchema = yup.object({

    });

    const onSubmitFormikData = (values: ITweetCreate) => {
        console.log("Values", values);
        if (values.postTime != null) {
            var now_utc = Date.UTC(values.postTime.getUTCFullYear(), values.postTime.getUTCMonth(),
                values.postTime.getUTCDate(), values.postTime.getUTCHours(),
                values.postTime.getUTCMinutes(), values.postTime.getUTCSeconds());
            setFieldValue("postTime", now_utc);
        }
        console.log("Values", values);
        formHttp.post('tweets/createTweet', values)
            .then(resp => {
                if (resp.data == "Done") {
                    formik.resetForm();
                    setImages([]);
                    props.loadPosts();
                    setDisableImages(false);
                }
            });



    }



    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const useAutosizeTextArea = (
        textAreaRef: HTMLTextAreaElement | null,
        value: string
    ) => {
        useEffect(() => {
            if (textAreaRef) {
                // We need to reset the height momentarily to get the correct scrollHeight for the textarea
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };

    const textAreaRef = useRef<HTMLTextAreaElement>(null);



    const handleChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;

        setFieldValue("tweetText", val);
    };



    const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(disableImages);
        if (!disableImages) {
            const files = e.target.files;
            if (files) {
                console.log("files");
                const file = files[0];
                const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
                if (!allowTypes.includes(file.type)) {
                    alert("Невірний формат файлу");
                    return;
                }
                const upload: IUploadImage = {
                    media: file
                }
                console.log(upload);
                formHttp.post<IUploadImageResult>('/tweets/uploadMedia', upload, {
                })
                    .then(resp => {
                        setImages([...images, resp.data]);
                        setFieldValue("mediaIds", [...values.mediaIds, resp.data.id]);
                        setGrid();
                        if (images.length == 3)
                            setDisableImages(true);
                    })
                    .catch(bad => {
                        console.log("Bad request", bad);
                    })

            }
        }
    }



    // const onDeleteImageHandler = async (id: number) => {
    //     try {
    //         await http.delete(`api/products/DeleteImage/${id}`);
    //         setImages(images?.filter(x => x.id !== id));
    //     } catch {
    //         console.log("Delete bad request");
    //     }
    // }
    const { values, handleSubmit, setFieldValue } = formik;

    useAutosizeTextArea(textAreaRef.current, values.tweetText);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isSeparator = (value: string): boolean => value === '/' || value === '\\' || value === ':';

    const getExtension = (path: string): string => {
        for (let i = path.length - 1; i > -1; --i) {
            const value = path[i];
            if (value === '.') {
                if (i > 1) {
                    if (isSeparator(path[i - 1])) {
                        return '';
                    }
                    return path.substring(i + 1);
                }
                return '';
            }
            if (isSeparator(value)) {
                return '';
            }
        }
        return '';
    };

    return (
        <div className="WritePost">
            <form onSubmit={handleSubmit}>
                <div className='inputBlock'>
                    <textarea className='inputPost' name="tweetText" onChange={handleChangeText} ref={textAreaRef} rows={1} value={values.tweetText} placeholder="What's new?" />
                    <div className='images' style={{ gridTemplateColumns: gridColumns, gridTemplateRows: gridRows }}>

                        {images.map((img, i) => (
                            <div key={img.id} className="col position-relative" style={i == 0 && images.length == 3 ? { gridRowStart: 1, gridRowEnd: 3 } : {}}>
                                <div className="imgUp">
                                    {getExtension(img.path) == "gif"
                                        ?
                                        <img
                                            src={`${APP_ENV.BASE_URL}/images/` + img.path}
                                            className="img-fluid"
                                            alt="Зображення"
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        />
                                        :
                                        <img
                                            src={images.length == 1 ? `${APP_ENV.BASE_URL}/images/1280_` + img.path : `${APP_ENV.BASE_URL}/images/600_` + img.path}
                                            className="img-fluid"
                                            alt="Зображення"
                                            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                                        />
                                    }

                                </div>

                            </div>
                        ))}
                    </div>

                    <div className='buttons'>
                        <div className='actions'>
                            <div className={disableImages ? "image-upload inputBtn disable action" : "image-upload inputBtn action"}>
                                <label htmlFor="file-input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 32 32" version="1.1">

                                        <title>image-picture</title>
                                        <desc>Created with Sketch Beta.</desc>
                                        <defs>

                                        </defs>
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Icon-Set" transform="translate(-360.000000, -99.000000)" fill={disableImages ? "#8B2E27" : "#EB4C42"}>
                                                <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 L368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 L368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 L388,99 Z" id="image-picture" >

                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </label>
                                <input id="file-input" accept="image/png, image/gif, image/jpeg" onChange={onChangeImageHandler} style={{ display: 'none' }} height={0} width={0} type="file" disabled={disableImages} />
                            </div>

                            <div className="datetime action">
                                <button type='button' className='inputBtn' onClick={handleShow} >
                                    <svg xmlns="http://www.w3.org/2000/svg" height={16} width={16} version="1.1" id="_x32_" viewBox="0 0 512 512">
                                        <g fill='#EB4C42'>
                                            <rect x="119.256" y="222.607" className="st0" width="50.881" height="50.885" />
                                            <rect x="341.863" y="222.607" className="st0" width="50.881" height="50.885" />
                                            <rect x="267.662" y="222.607" className="st0" width="50.881" height="50.885" />
                                            <rect x="119.256" y="302.11" className="st0" width="50.881" height="50.885" />
                                            <rect x="267.662" y="302.11" className="st0" width="50.881" height="50.885" />
                                            <rect x="193.46" y="302.11" className="st0" width="50.881" height="50.885" />
                                            <rect x="341.863" y="381.612" className="st0" width="50.881" height="50.885" />
                                            <rect x="267.662" y="381.612" className="st0" width="50.881" height="50.885" />
                                            <rect x="193.46" y="381.612" className="st0" width="50.881" height="50.885" />
                                            <path className="st0" d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025   c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424   c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246   c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4   C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144   c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z" />
                                            <path className="st0" d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459   c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z" />
                                            <path className="st0" d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16   c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z" />
                                        </g>
                                    </svg>
                                    {/* <Icon color='#EB4C42'height={20} width={20}></Icon> */}
                                </button>

                                <Modal show={show} centered className='modalSchedule' onHide={handleClose}>
                                    <Modal.Header className='scheduleHeader'>
                                        Schedule
                                    </Modal.Header>
                                    <Modal.Body className='scheduleBody'>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <StaticDateTimePicker className='schedule' ampm={false} orientation="landscape" onClose={handleClose} onAccept={handleClose} minDateTime={dayjs(new Date())} onChange={(value) => { setFieldValue("postTime", value?.toDate()); console.log(value?.toDate()); setFieldValue("timeZone", value?.utcOffset()) }} />
                                        </LocalizationProvider>
                                    </Modal.Body>
                                </Modal>
                            </div>
                            <div className="datetime action">
                                <button type='button' className='inputBtn' ref={btn} onClick={() => showEmoji ? setShowEmoji(false) : setShowEmoji(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EB4C42" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                    </svg>
                                </button>
                                <div className='emojiPicker' ref={container} style={{ display: showEmoji ? "block" : "none" }}>
                                    <Picker data={data} emojiButtonSize={28} previewPosition={"none"} zIndex={5} emojiSize={22} className="emojiPicker" onEmojiSelect={(value: any) => { setFieldValue("tweetText", values.tweetText + value.native) }} />
                                </div>

                            </div>
                        </div>
                        {/* {values.postTime != undefined ? values.postTime.toLocaleString() : ""} -
                        {values.timeZone} */}
                        <button className="btnProfile" type='submit'>Send</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

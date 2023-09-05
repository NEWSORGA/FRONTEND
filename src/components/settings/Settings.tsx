import React, { ChangeEvent, useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ENV } from '../../env';
import { formHttp, http } from '../../http';
import { AuthUserActionType, IAuthUser, IUser } from '../../store/types';
import { IUserView, ITweetView, IUploadImage } from '../profile/types';
import { countries } from '../../constants/countries';
import './Settings.css';
import { IChangeImage, IUserEdit } from './types';
import { useFormik } from "formik";
import * as yup from "yup";


export default function Settings() {
  const [userPage, setUser] = useState<IUserView>();
  const [saveText, setSaveText] = useState<string>("");
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  const [loadingProfile, setLoadProfile] = useState<boolean>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    loadProfile();

  }, [])

  const loadProfile = () => {
    setLoadProfile(true);
    let url = "";
    if (isAuth) {
      url = "auth/" + user?.id;
      http.get<IUserView>(url).then(async (res) => {
        console.log("User: ", res.data);
        console.log(APP_ENV.BASE_URL + "/images/" + res.data.image);
        // await sleep(1000);
        setLoadProfile(false);
        setUser(res.data);
        setFieldValue("name", res.data.name);
        setFieldValue("country", res.data.country);
        setFieldValue("countryCode", res.data.countryCode);
        setFieldValue("description", res.data.description);
      });

    }
    else {
      navigate("/login");
    }
  }

  const initValues: IUserEdit = {
    name: userPage?.name ? userPage.name : "",
    country: userPage?.country ? userPage?.country : "",
    countryCode: userPage?.countryCode ? userPage?.countryCode : "",
    description: userPage?.description ? userPage?.description : ""
  };

  const createSchema = yup.object({

  });

  const onSubmitFormikData = async (values: IUserEdit) => {


    console.log("Values", countries.find(c => c.code.toLocaleLowerCase() == values.countryCode)?.name);
    
    const country = await countries.find(c => c.code.toLocaleLowerCase() == values.countryCode)?.name;
    setSaveText("Loading");
    console.log("country" + country);
    setFieldValue("country", country).then(() => {
      const val = {
        name: values.name,
        country: country,
        countryCode: values.countryCode,
        description: values.description
      }
      console.log("Values", val);
      formHttp.post('auth/changeData', val)
        .then(resp => {

          setSaveText("Saved");
        });
    });

  }



  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (files) {
      console.log("files");
      const file = files[0];
      const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!allowTypes.includes(file.type)) {
        alert("Невірний формат файлу");
        return;
      }
      const upload: IChangeImage = {
        backgroundImage: file
      }
      console.log(upload);
      formHttp.post('auth/changeAvatar', upload, {
      })
        .then(async resp => {
          await dispatch({
            type: AuthUserActionType.LOGIN_USER, payload: {
              id: user?.id,
              name: values.name,
              image: resp.data,
              email: user?.email,
              bg: user?.bg
            } as IUser
          });
          navigate(0);
        })
        .catch(bad => {
          console.log("Bad request", bad);
        })

    }

  }

  const onChangeBgHandler = (e: ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (files) {
      console.log("files");
      const file = files[0];
      const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!allowTypes.includes(file.type)) {
        alert("Невірний формат файлу");
        return;
      }
      const upload: IChangeImage = {
        backgroundImage: file
      }
      console.log(upload);
      formHttp.post('auth/changeBackgroung', upload, {
      })
        .then(resp => {
          dispatch({
            type: AuthUserActionType.LOGIN_USER, payload: {
              id: user?.id,
              name: values.name,
              image: user?.image,
              email: user?.email,
              bg: resp.data
            } as IUser
          });
          navigate(0);
        })
        .catch(bad => {
          console.log("Bad request", bad);
        })

    }

  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData
  });

  const { values, handleSubmit, setFieldValue, handleChange } = formik;


  return (
    <>
      <div className="ProfileWrapper d-flex justify-content-center"
        style={{ backgroundImage: userPage?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage})` : "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgb(48, 9, 1) 100%)" }}>
        <div className="ProfileBackground " style={{ alignItems: loadingProfile ? "center" : "start", justifyContent: loadingProfile ? "center" : "start" }}>
          {loadingProfile ? <MutatingDots
            height="100"
            width="100"
            color="#EB4C42"
            secondaryColor='#EB4C42'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass="loadProfile"
            visible={loadingProfile}
          /> : (<>
            <div className='profileLine UserDataBlock'>
              <div className="ProfileImageBlock">

                <label htmlFor="file-input" className='labelImage' style={{ cursor: 'pointer' }}>
                  <img src={APP_ENV.BASE_URL + "/images/" + userPage?.image} className='ProfileAvatar' />
                  <div className='hoverImg' >
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="40px" height="40px"><g fill="#dededf" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M23.90625,3.96875c-1.04687,0 -2.09375,0.40625 -2.90625,1.21875l-15.8125,15.8125l-0.0625,0.3125l-1.09375,5.5l-0.3125,1.46875l1.46875,-0.3125l5.5,-1.09375l0.3125,-0.0625l15.8125,-15.8125c1.625,-1.625 1.625,-4.1875 0,-5.8125c-0.8125,-0.8125 -1.85937,-1.21875 -2.90625,-1.21875zM23.90625,5.875c0.50391,0 1.01172,0.23047 1.5,0.71875c0.97266,0.97266 0.97266,2.02734 0,3l-0.71875,0.6875l-2.96875,-2.96875l0.6875,-0.71875c0.48828,-0.48828 0.99609,-0.71875 1.5,-0.71875zM20.3125,8.71875l2.96875,2.96875l-12.09375,12.09375c-0.65625,-1.28125 -1.6875,-2.3125 -2.96875,-2.96875zM6.9375,22.4375c1.19922,0.48438 2.14063,1.42578 2.625,2.625l-3.28125,0.65625z" /></g></g></svg>
                  </div>
                </label>

                <input id="file-input" accept="image/png, image/jpeg" onChange={onChangeImageHandler} style={{ display: 'none' }} height={0} width={0} type="file" />
              </div>

              <div className="ProfileImageBlock">

                <label htmlFor="file-input2" className='labelImage' style={{ cursor: 'pointer' }}>
                  <img src={APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage} className='ProfileBg' />
                  <div className='hoverImg' >
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="40px" height="40px"><g fill="#dededf" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M23.90625,3.96875c-1.04687,0 -2.09375,0.40625 -2.90625,1.21875l-15.8125,15.8125l-0.0625,0.3125l-1.09375,5.5l-0.3125,1.46875l1.46875,-0.3125l5.5,-1.09375l0.3125,-0.0625l15.8125,-15.8125c1.625,-1.625 1.625,-4.1875 0,-5.8125c-0.8125,-0.8125 -1.85937,-1.21875 -2.90625,-1.21875zM23.90625,5.875c0.50391,0 1.01172,0.23047 1.5,0.71875c0.97266,0.97266 0.97266,2.02734 0,3l-0.71875,0.6875l-2.96875,-2.96875l0.6875,-0.71875c0.48828,-0.48828 0.99609,-0.71875 1.5,-0.71875zM20.3125,8.71875l2.96875,2.96875l-12.09375,12.09375c-0.65625,-1.28125 -1.6875,-2.3125 -2.96875,-2.96875zM6.9375,22.4375c1.19922,0.48438 2.14063,1.42578 2.625,2.625l-3.28125,0.65625z" /></g></g></svg>
                  </div>
                </label>

                <input id="file-input2" accept="image/png, image/jpeg" onChange={onChangeBgHandler} style={{ display: 'none' }} height={0} width={0} type="file" />
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <div className="UserDataBlock">
                <div className="inputBlock">
                  <input type='text' id='name' name='name' value={values.name} onChange={handleChange} className='textInput' placeholder='Name'></input>
                </div>
                <div className="inputBlock">


                  <select id='countryCode' name='countryCode' value={values.countryCode} onChange={handleChange} className='textInput' placeholder='Country'>
                    {countries.map(country =>
                      <option value={country.code.toLowerCase()}>{country.name}</option>
                    )}
                  </select>
                </div>
                <div className="inputBlock">
                  <textarea id='description' value={values.description} onChange={handleChange} name='description' className='textInput description' placeholder='Description'></textarea>
                </div>
                <div className="inputBlock" style={{ display: 'flex', alignItems: 'center' }}>
                  <button className='ApllyBtn' type='submit'>Apply</button>
                  <span style={{ marginLeft: '15px', display: 'block', color: '#ffffff' }}>{saveText}</span>
                </div>
              </div>
            </form>

          </>

          )}
        </div>
      </div>
    </>
  )
}

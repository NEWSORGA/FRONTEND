import React, { useEffect, useState } from 'react'
import { MutatingDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ENV } from '../../env';
import { http } from '../../http';
import { IAuthUser } from '../../store/types';
import { IUserView, ITweetView } from '../profile/types';
import { countries } from '../../constants/countries';
import './Settings.css';

export default function Settings() {
  const [userPage, setUser] = useState<IUserView>();

  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  const [loadingProfile, setLoadProfile] = useState<boolean>();
  const navigate = useNavigate();

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
      });

    }
    else {
      navigate("/login");
    }
  }




  return (
    <>
      <div className="ProfileWrapper d-flex justify-content-center"
        style={{ backgroundImage: userPage?.backgroundImage != null ? `url(${APP_ENV.BASE_URL + "/images/" + userPage?.backgroundImage})` : "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
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
              <div className="ProfileAvatarBlock">
                <img src={APP_ENV.BASE_URL + "/images/" + userPage?.image} className='ProfileAvatar' />
                <div className='hoverImg'>
                  <svg xmlns="http://www.w3.org/2000/svg"xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="40px" height="40px"><g fill="#dededf" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M23.90625,3.96875c-1.04687,0 -2.09375,0.40625 -2.90625,1.21875l-15.8125,15.8125l-0.0625,0.3125l-1.09375,5.5l-0.3125,1.46875l1.46875,-0.3125l5.5,-1.09375l0.3125,-0.0625l15.8125,-15.8125c1.625,-1.625 1.625,-4.1875 0,-5.8125c-0.8125,-0.8125 -1.85937,-1.21875 -2.90625,-1.21875zM23.90625,5.875c0.50391,0 1.01172,0.23047 1.5,0.71875c0.97266,0.97266 0.97266,2.02734 0,3l-0.71875,0.6875l-2.96875,-2.96875l0.6875,-0.71875c0.48828,-0.48828 0.99609,-0.71875 1.5,-0.71875zM20.3125,8.71875l2.96875,2.96875l-12.09375,12.09375c-0.65625,-1.28125 -1.6875,-2.3125 -2.96875,-2.96875zM6.9375,22.4375c1.19922,0.48438 2.14063,1.42578 2.625,2.625l-3.28125,0.65625z" /></g></g></svg>
                </div>
              </div>


            </div>

            <div className="UserDataBlock">
              <div className="inputBlock">
                <input type='text' id='name' defaultValue={userPage?.name} className='textInput' placeholder='Name'></input>
              </div>
              <div className="inputBlock">


                <select id='country' defaultValue={userPage?.countryCode} className='textInput' placeholder='Country'>
                  {countries.map(country =>
                    <option value={country.code.toLowerCase()}>{country.name}</option>
                  )}
                </select>
              </div>
              <div className="inputBlock">
                <textarea id='country' defaultValue={userPage?.description} className='textInput description' placeholder='Description'></textarea>
              </div>
              <div className="inputBlock">
                <button className='ApllyBtn'>Apply</button>
              </div>
            </div>
          </>

          )}
        </div>
      </div>
    </>
  )
}

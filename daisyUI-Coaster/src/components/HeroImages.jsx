import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { ImagesContext } from '../context/images/ImagesContext';
import { types } from '../types/Types';

const HeroImages = () => {

    const { imagesState, dispatch } = useContext(ImagesContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleClick = () => {
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('image', image);
        dispatch({
            type: types.startLoading
        });
        axios.post('http://localhost:4000/images/add', data).then((res) => {
            console.log(res);
            dispatch({
                type: types.uploadImage,
                payload: res.data
            });
        });
        clear();
    }

    const clear = () => {
        setTitle('');
        setDescription('');
        setImage('');
    }

    useEffect(() => {
        axios.get('http://localhost:4000/')
        .then((response) => {
            dispatch({
                type: types.loadImages,
                payload: response.data
            });
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error);
        });
    }, [dispatch]);

  return (
    <>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    {
                        imagesState.loading ? (
                            <div className="flex justify-center items-center h-full">
                                <img className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* row 1 */}
                                        {
                                            imagesState.images.map((item) => (
                                                <tr key={item._id}>
                                                    <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.imageURL} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                        </div>
                                                        <div>
                                                        <div className="font-bold">{item.title}</div>
                                                        <div className="text-sm opacity-50">Title</div>
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        {item.description}
                                                    </td>
                                                    <th>
                                                    <button className="btn btn-ghost btn-xs">details</button>
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                    {/* foot */}
                                    <tfoot>
                                    <tr>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                    </tfoot>
                                    
                                </table>
                            </div>
                        )
                    }
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            placeholder="title" 
                            className="input input-bordered" 
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="description" 
                            className="textarea textarea-bordered" 
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input 
                            type="file" 
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs" 
                            onChange={handleImage}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button 
                            onClick={handleClick}
                            className="btn btn-primary"
                        >
                            Upload
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeroImages
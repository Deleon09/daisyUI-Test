import React, { useState, useEffect } from 'react'
import axios from 'axios';

const HeroImages = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        axios.post('http://localhost:4000/images/add', data).then((res) => {
            console.log(res);
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
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error en la solicitud GET:', error);
            setLoading(false);
        });
    }, []);

  return (
    <>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    {
                        loading ? (
                            <div class="flex justify-center items-center h-full">
                                <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
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
                                            data.map((item) => (
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
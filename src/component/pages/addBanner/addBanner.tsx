import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, InputLabel, CardMedia } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';

import { addBanner, uploadImageToCloudinary } from '../../../services/banners.service';
import { useNavigate, useParams } from 'react-router-dom';
import { BannerFormData } from '../../interface/interface';
import { useAppDispatch } from '../../../rtk/hooks';
import { addBannerRtk } from '../../../rtk/bannersSlice';

const AddBanner: React.FC = () => {
    const dispatch = useAppDispatch()
    const Navigate = useNavigate()
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [status, setStatus] = useState('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [createAt, setCreateAt] = useState(new Date());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BannerFormData>({
        resolver: yupResolver(schema),
    });

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const imageUrl = await uploadImageToCloudinary(e.target.files[0]);
            if (imageUrl) {
                setImage(imageUrl);
                setUploadedImage(e.target.files[0]);
            }
        }
    };

    const handleReplaceImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
        const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
    
        try {
            const requestData = {
                "id": data.id,
                "image": {
                    "url": image,
                    "alt": data.image.alt,
                },
                "text": data.text,
                "createAt": data.createAt,
                "author": data.author,
                "rating": data.rating,
                "sale": data.sale,
                "category": data.category,
                "productID": id,
            };

            const response = await addBanner(requestData, options);
            if (response.status < 210) {
                setStatus('Banner added successfully!');
                Navigate('/banner/userBanners')
                dispatch(addBannerRtk(requestData))
            } else {
                console.error('Failed to add banner');
                setStatus('Failed to add banner! please try again!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <Box sx={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <Typography sx={{ textAlign: "center", fontSize: "30px" }}>Add New Banner</Typography>
            <Box component="form" sx={{ backgroundColor: "#f2f2f2e8", padding: "20px", paddingLeft: "85px", borderRadius: "8px" }} onSubmit={handleSubmit(onSubmit)}>
                <TextField className='formField' sx={{ marginBottom: "20px", backgroundColor: "#f9f9f9" }}
                    label="ID:"
                    {...register('id')}
                    error={!!errors.id}
                    helperText={errors.id?.message}
                />
                { uploadedImage ? (
                <CardMedia
                    component="img"
                    alt="No photo added"
                    height="140"
                    image={(image || (uploadedImage ? URL.createObjectURL(uploadedImage) : '')) as string}
                    sx={{ marginBottom: "15px", maxWidth: "222px" }}
                />) : null}
                <TextField className='formField' sx={{ marginBottom: "5px", backgroundColor: "#f9f9f9", display: "none" }}
                    type='file'
                    label="Upload image"
                    {...register('image.url')}
                    onChange={onImageChange}
                    error={!!errors.image?.url}
                    helperText={errors.image?.url?.message}
                    inputRef={fileInputRef}
                />
                <InputLabel htmlFor="image.url" sx={{ marginBottom: "5px" }}>
                    <Button onClick={handleReplaceImageClick} variant="contained">
                        Add image
                    </Button>
                </InputLabel>
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    label="Alt"
                    {...register('image.alt')}
                    error={!!errors.image?.alt}
                    helperText={errors.image?.alt?.message}
                />
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    label="Text:"
                    {...register('text')}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                />
                <TextField className='formField' sx={{ width: "222px", marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    type='date'
                    {...register('createAt', { value: createAt })}
                    error={!!errors.createAt}
                    helperText={errors.createAt?.message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreateAt(new Date(e.target.value))}
                    InputLabelProps={{ shrink: true }}
                    value={createAt.toISOString().split('T')[0]}
                />
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    label="Author:"
                    {...register('author')}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                />
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    type='number'
                    label="Rating:"
                    {...register('rating')}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                />
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    type='number'
                    label="sale"
                    {...register('sale')}
                    error={!!errors.sale}
                    helperText={errors.sale?.message}
                />
                <TextField className='formField' sx={{ marginBottom: "15px", backgroundColor: "#f9f9f9" }}
                    label="category"
                    {...register('category')}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                />
                <Button type='submit' variant="contained">
                    Add Banner
                </Button>
                <Typography color={status === 'Banner added successfully!' ? 'success' : 'error'}>
                    {status}
                </Typography>
            </Box>
        </Box>
    );
};

export default AddBanner;
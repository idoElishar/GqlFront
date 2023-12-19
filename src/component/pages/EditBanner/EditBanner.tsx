import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, InputLabel, TextField, Typography, CardMedia, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { BannerFormData } from '../../interface/interface';
import schema from './schema';
import { uploadImageToCloudinary, updateBanner } from '../../../services/banners.service';
import { getBanner } from '../../../services/banners2.service';

const EditBanner: React.FC = () => {
  const [createAt, setCreateAt] = useState(new Date());
  const [status, setStatus] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, } = useForm<BannerFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerData = await getBanner(id!);
        setImagePreview(bannerData.image.url);
        Object.entries(bannerData).forEach(([key, value]) => {
          setValue(key as keyof BannerFormData, value as typeof key);
        });
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };
    fetchBanner();
  }, [id, setValue]);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageUrl = await uploadImageToCloudinary(e.target.files[0]);
      if (imageUrl) {
        setImagePreview(imageUrl);
        setValue('image.url', imageUrl);
      }
    }
  };
  const handleReplaceImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
    try {
      setLoading(true);
      const requestData = {
        id: data.id,
        image: {
          url: imagePreview,
          alt: data.image.alt,
        },
        text: data.text,
        createAt: data.createAt,
        author: data.author,
        rating: data.rating,
        sale: data.sale,
        category: data.category,
        productID: data.productID,
      };
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await updateBanner(id, requestData, options);
      if (response.status < 210) {
        setStatus("Banner updated successfully!");
        Navigate("/banner/userBanners");
      } else {
        console.error("Failed to update banner");
        setStatus("Failed to update banner! please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
        Edit Banner
      </Typography>
      <Box
        component="form"
        sx={{
          backgroundColor: "#f2f2f2e8",
          padding: "20px",
          paddingLeft: "85px",
          borderRadius: "8px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputLabel htmlFor="img">Current image:</InputLabel>
        <CardMedia
          component="img"
          alt="Banner Preview"
          height="140"
          image={imagePreview}
          sx={{ marginBottom: "15px", maxWidth: "222px" }}
        />
        <TextField
          sx={{ marginBottom: "15px", display: "none" }}
          type="file"
          {...register("image.url")}
          onChange={onImageChange}
          error={!!errors.image?.url}
          helperText={errors.image?.url?.message}
          inputRef={fileInputRef}
        />
        <InputLabel htmlFor="image.url" sx={{ marginBottom: "15px" }}>
          <Button onClick={handleReplaceImageClick} variant="contained">
            Replace the image
          </Button>
        </InputLabel>
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Alt:"
          {...register("image.alt")}
          error={!!errors.image?.alt}
          helperText={errors.image?.alt?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Text:"
          {...register("text")}
          error={!!errors.text}
          helperText={errors.text?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ marginBottom: "15px", width: "222px" }}
          label="Create at:"
          type="date"
          {...register("createAt")}
          error={!!errors.createAt}
          helperText={errors.createAt?.message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreateAt(new Date(e.target.value))}
          InputLabelProps={{ shrink: true }}
          value={createAt.toISOString().split("T")[0]}
        />
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Author:"
          {...register("author")}
          error={!!errors.author}
          helperText={errors.author?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Rating:"
          type="number"
          {...register("rating")}
          error={!!errors.rating}
          helperText={errors.rating?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Sale:"
          type="number"
          {...register("sale")}
          error={!!errors.sale}
          helperText={errors.sale?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ marginBottom: "15px" }}
          label="Category:"
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Edit Banner"}
        </Button>
        <Typography color={status === "Banner updated successfully!" ? "green" : "red"}>
          {status}
        </Typography>
      </Box>
    </Box>
  );
};
export default EditBanner;
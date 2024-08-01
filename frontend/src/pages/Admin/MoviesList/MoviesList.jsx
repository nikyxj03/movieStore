
import React from 'react'
import { useDeleteMovieMutation, 
  useGetMovieByIdMutation, 
  useUpdateMovieMutation, 
  useAllMoviesQuery, 
  useCreateMovieMutation,
  useUploadProductImageMutation } from '../../../redux/api/movieApiSlice';

import './MoviesList.css'
import Sidebar from "../../SideBar/Sidebar"
import Modal from 'react-modal'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


Modal.setAppElement('#root');

const MoviesList = () => {
  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [genre, setGenre] = useState("")
  const [language, setLanguage] = useState("")
  const [actor, setActor] = useState("")
  const [actress, setActress] = useState("")
  const [director, setDirector] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [selectedMovie, setSelectedMovie] = useState("")
  const [imageUrl, setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()
  const[createMovie] = useCreateMovieMutation()
  const [updateMovie] = useUpdateMovieMutation(); 
  const [deleteMovie] = useDeleteMovieMutation()

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      console.log(selectedMovie)
      if(selectedMovie){
        console.log(selectedMovie._id)

        const res = await updateMovie({
          movieId: selectedMovie._id.trim(),
          movieData:{
          title,
          image,
          synopsis,
          genre,
          language,
          actor,
          actress,
          director,
          price,
          category}}
        ).unwrap();
        toast.success('Movie updated successfully');
      } else{
      console.log(title)
      const res = await createMovie(
        { 
          title,
          image,
          synopsis,
          genre,
          language,
          actor,
          actress,
          director,
          price,
          category

        }
          ).unwrap()
          
          toast.success('Movie created successfully')
      }
          navigate('/admin/movieslist')
          closeModal()
    } catch(error){
      console.error(error)
      toast.error("Movie create failed. Try again")
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res)
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
      console.log(imageUrl)
      console.log(image)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };



  const handleDelete = async () => {
    console.log(selectedMovie._id)
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      await deleteMovie(selectedMovie._id);

      toast.success(`Movie is deleted`)
      navigate("/admin/movieslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.") 
    }
  };



  const {data: movies, isLoading, isError} = useAllMoviesQuery();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
    resetFormFields();
  }
  


  const openNewModal = () => {
    setSelectedMovie(null)
    openModal();
  }

  const openUpdateModal = (movie) => {
    setSelectedMovie(movie); 
    setTitle(movie.title);
    setSynopsis(movie.synopsis);
    setGenre(movie.genre);
    setLanguage(movie.language);
    setActor(movie.actor);
    setActress(movie.actress);
    setDirector(movie.director);
    setPrice(movie.price);
    setCategory(movie.category);
    setImage(movie.image);
    setImageUrl(movie.image);
    openModal();
  }

  const selectDelete = (movie) => {
    handleDelete()
    setSelectedMovie(movie)
  }
  const resetFormFields = () => {
    setTitle("");
    setSynopsis("");
    setGenre("");
    setLanguage("");
    setActor("");
    setActress("");
    setDirector("");
    setPrice("");
    setCategory("");
    setImage(null);
    setImageUrl(null);
  };


  if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error loading products</div>;
    }
    


  return (
    <>
   
    <Sidebar/>
    <div className='moviepage'>
      <div className='headings'>
        <h1> All Movies ({movies.length})</h1>
        <button className='press-1' onClick={openNewModal}>
            New Movie
        </button>
      </div>
      

      <div>
        {movies.map((movie) => (
           
            <div key={movie._id} className='mov'>
            
            <h4>
                {movie?.title}    
            </h4>     
            
            <div className=' details'>
            <p className='para'>
              <img className = "im" src={movie.image} alt={movie.name} />
            </p>

          <div className='sub'> 
            <p className='para-1'>
                Synopsis : {movie?.synopsis}
            </p>

            <p className='para-1'>
                Actor: {movie?.actor}
            </p>
            <p className='para-1'>
                Actress: {movie?.actress}
            </p>
            <p className='para-1'>
                Directed by: {movie?.director}
            </p>
            </div>

            </div>
            <div className='presses'>
            <button className='press-1' onClick={() => openUpdateModal(movie)}>
            Update
           </button>

           <button className='press-1' onClick={() => selectDelete(movie)}>
            Delete
           </button>
           </div>
            </div>
        ))}
      </div>
    </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={selectedMovie ? "Update Movie" : "Create New Movie"}
        className="Modal"
        overlayClassName="Overlay"
      >

       
      <div className='box'>
      <h2>{selectedMovie ? "Update Movie" : "Create New Movie"}</h2>
    
       <form onSubmit={handleSubmit}>
       <div className='divide'>
        <div className='st'>


       
       {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className='siz'
              />
            </div>
          )}

          <div className='upload'>
            <label className='que'>
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="preview"
              />
            </label>
          </div>
          </div>
          <div>

          <div className='line'>
          <label className='que'>
            Title:
          </label>

          <input type="text"  className="ans" name="title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          
          <div className='line'> 
          <label className='que'>
            Synopsis:
            </label>
            <input type = "text" className="ans" value={synopsis} onChange={(e) => setSynopsis(e.target.value)}/>
          </div>

          <div className='line'> 
          <label className='que'>
            Genre:
            </label>
            <input type = "text"  className="ans" value={genre} onChange={(e) => setGenre(e.target.value)}/>
          </div>

          <div className='line'>
          <label className='que'>
            Language:
            </label>
            <input type = "text" className="ans" value={language} onChange={(e) => setLanguage(e.target.value)}/>
          </div>
          </div>

          <div>
          <div className='line'>
          <label className='que'>
            Actor:
            </label>
            <input type = "text" className="ans" value={actor} onChange={(e) => setActor(e.target.value)}/>
          </div>

          <div className='line'>
          <label className='que'>
            Actress:
            </label>
            <input type = "text" className="ans" value={actress} onChange={(e) => setActress(e.target.value)}/>
          </div>

          <div className='line'>
          <label className='que'>
            Director:
            </label>
            <input type = "text" className="ans" value={director} onChange={(e) => setDirector(e.target.value)}/>
          </div>

          <div className='line'>
          <label className='que'>
            Price:
            </label>
            <input type = "number" className="ans" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>

          <div className='line'>
          <label className='que'>
            Category:
            </label>
            <input type = "text" className="ans" value={category} onChange={(e) => setCategory(e.target.value)}/>
          </div>
          </div>
          </div>
          <div className='presses'>
          <button type = "submit" className='press'>{selectedMovie ? "Update" : "Submit"}</button>
          <button type="button" className='press' onClick={closeModal}>Close</button>

          </div>
          
          </form>
          </div> 
       
      </Modal>
    </>
  )
}


export default MoviesList

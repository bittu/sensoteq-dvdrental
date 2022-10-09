import { Fragment, useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Error from "./Error";

const FilmsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState()

  useEffect(() => {
    fetch('/v1/categories')
      .then(rsp => rsp.json())
      .then(data => setCategories(data))
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch('/v1/filmsByCategory?category_name=' + selectedCategory.category_id)
        .then(rsp => rsp.json())
        .then(data => {
          setLoading(false);
          if (data.code) {
            setError(`${data.code}: ${data.message}`)
            return
          }
          setFilms(data);
        })
    }
  }, [selectedCategory])


  return (
    <Fragment>
      <Autocomplete
        disablePortal
        options={categories}
        getOptionLabel={option => option.name}
        onChange={(event, newValue) => {setSelectedCategory(newValue)}}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      {error ? (
        <Error message={error} />
      ) : loading ? (
        <Box sx={{ display: 'flex', m: 4 }}>
          <CircularProgress />
        </Box>
      ) : films ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Film Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Rental Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {films.map(film => (
                  <TableRow key={film.film_id}>
                    <TableCell>{film.film_id}</TableCell>
                    <TableCell>{film.title}</TableCell>
                    <TableCell>{film.description}</TableCell>
                    <TableCell>{film.rental_rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        null
      )}
    </Fragment>
  )

}

export default FilmsByCategory;
import { Fragment, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
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


const FilmsByTitle = () => {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState(null)
  const [error, setError] = useState()

  const onSubmit = () => {
    if (loading) {
      return;
    }
    if (!title && !length) {
      alert('Please enter atleast one of title and length');
      return;
    }

    const params = new URLSearchParams(Object.fromEntries(Object.entries({ title, length }).filter(([_, v]) => v != null)));

    setLoading(true)
    fetch(`/v1/filmsByTitle?${params.toString()}`)
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

  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Length"
          value={length}
          onChange={e => setLength(e.target.value)}
        />
        <Button variant="contained" onClick={onSubmit}>Search</Button>
      </Box>
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
                  <TableCell>Category</TableCell>
                  <TableCell>Language</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {films.map(film => (
                  <TableRow key={film.film_id}>
                    <TableCell>{film.film_id}</TableCell>
                    <TableCell>{film.title}</TableCell>
                    <TableCell>{film.description}</TableCell>
                    <TableCell>{film.rental_rate}</TableCell>
                    <TableCell>{film.category}</TableCell>
                    <TableCell>{film.language}</TableCell>
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

export default FilmsByTitle;
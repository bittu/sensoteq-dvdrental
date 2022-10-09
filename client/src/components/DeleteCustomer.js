import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import Error from "./Error";
import Success from "./Success";


const DeleteCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const [selectedCustomer, setSelectedCustomer] = useState()

  const onSubmit = () => {
    setError(false)
    setSuccess(false)
    if (loading) {
      return;
    }
    if (!selectedCustomer) {
      alert('Please select a customer to delete');
      return;
    }

    setLoading(true);
    fetch('/v1/deleteCustomer', {
      method: 'POST',
      body: JSON.stringify({customer_id: selectedCustomer.customer_id}),
      headers: {
        "Content-type": 'application/json'
      }
    })
      .then(rsp => rsp.json())
      .then(data => {
        setLoading(false)
        if (data.code) {
          setError(`${data.code}: ${data.message}`)
          return
        }
        setSuccess(data.message)
        // refetch customers
      })
  }

  useEffect(() => {
    fetch('/v1/customers')
      .then(rsp => rsp.json())
      .then(data => setCustomers(data))
  }, [])

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
    >
      {error && (
        <Error message={error} />
      )}
      {success && (
        <Success message={success} />
      )}
      <Autocomplete
        disablePortal
        options={customers}
        getOptionLabel={option => `${option.customer_id}: ${option.name}`}
        onChange={(event, newValue) => {setSelectedCustomer(newValue)}}
        renderInput={(params) => <TextField {...params} label="Customer" />}
      />
      <Button variant="contained" onClick={onSubmit}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          'Delete Customer'
        )}
      </Button>
    </Box>
  )
}

export default DeleteCustomer;
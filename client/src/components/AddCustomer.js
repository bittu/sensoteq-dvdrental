import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Error from "./Error";
import Success from "./Success";

const AddCustomer = () => {
  const [stores, setStores] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const [store_id, setStoreId] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [district, setDistrict] = useState();
  const [city_id, setCityId] = useState();
  const [postal_code, setPostalCode] = useState();

  const onSubmit = () => {
    setError(false)
    setSuccess(false)
    if (loading) {
      return;
    }

    if (!store_id || !first_name || !last_name || !email || !phone || !address || !address2 || !district || !city_id || !postal_code) {
      alert('Please fill in all details')
      return;
    }

    const customerInfo = {
      store_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      address2,
      district,
      city_id,
      postal_code
    }

    setLoading(true)

    fetch('/v1/addCustomer', {
      method: 'POST',
      body: JSON.stringify(customerInfo),
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
      })
  }

  useEffect(() => {
    fetch('/v1/stores')
      .then(rsp => rsp.json())
      .then(data => setStores(data));

    fetch('/v1/cities')
      .then(rsp => rsp.json())
      .then(data => setCities(data));
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
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            label="Store"
            select
            value={store_id}
            onChange={e => setStoreId(e.target.value)}
          >
            {stores.map((option) => (
              <MenuItem key={option.store_id} value={option.store_id}>
                {option.store_id}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="First Name"
            value={first_name}
            fullWidth
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            value={last_name}
            fullWidth
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Email"
            value={email}
            fullWidth
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            value={phone}
            fullWidth
            onChange={e => setPhone(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Address"
            value={address}
            fullWidth
            onChange={e => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address2"
            value={address2}
            fullWidth
            onChange={e => setAddress2(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="District"
            value={district}
            fullWidth
            onChange={e => setDistrict(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="City"
            select
            value={city_id}
            fullWidth
            onChange={e => setCityId(e.target.value)}
          >
            {cities.map((option) => (
              <MenuItem key={option.city_id} value={option.city_id}>
                {option.city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Postal Code"
            value={postal_code}
            fullWidth
            onChange={e => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              'Add Customer'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddCustomer;
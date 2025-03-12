import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const CrearLicenciaForm = () => {
  const [formData, setFormData] = useState({
    nombreLicencia: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "activa", // Valor por defecto
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de la licencia:", formData);

    // Aquí puedes enviar los datos a tu API o backend
    // Ejemplo:
    axios
      .post("https://saturnodelgado.com:5002/api/licencias", formData)
      .then((response) => console.log("Licencia creada:", response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nueva Licencia
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Campo: Nombre de la Licencia */}
          <TextField
            fullWidth
            label="Nombre de la Licencia"
            name="nombreLicencia"
            value={formData.nombreLicencia}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Campo: Fecha de Inicio */}
          <TextField
            fullWidth
            label="Fecha de Inicio"
            name="fechaInicio"
            type="date"
            value={formData.fechaInicio}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          {/* Campo: Fecha de Fin */}
          <TextField
            fullWidth
            label="Fecha de Fin"
            name="fechaFin"
            type="date"
            value={formData.fechaFin}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          {/* Campo: Estado */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              label="Estado"
              required
            >
              <MenuItem value="activa">Activa</MenuItem>
              <MenuItem value="inactiva">Inactiva</MenuItem>
              <MenuItem value="expirada">Expirada</MenuItem>
            </Select>
          </FormControl>

          {/* Botón de Envío */}
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Crear Licencia
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CrearLicenciaForm;

import React, { useState, useEffect } from "react";
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

const CrearUsuarioForm = () => {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    licencia_id: "",
  });

  // Estado para almacenar la lista de licencias disponibles
  const [licencias, setLicencias] = useState([]);

  // Obtener la lista de licencias al cargar el componente
  useEffect(() => {
    const fetchLicencias = async () => {
      try {
        const response = await axios.get(
          "https://saturnodelgado.com:5002/api/licencias"
        );
        console.log({ response }); // Ajusta la ruta según tu API
        setLicencias(response.data);
      } catch (error) {
        console.error("Error al obtener las licencias:", error);
      }
    };

    fetchLicencias();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del usuario:", formData);

    try {
      const response = await axios.post(
        "https://saturnodelgado.com:5002/api/users",
        formData
      ); // Ajusta la ruta según tu API
      console.log("Usuario creado:", response.data);
      alert("Usuario creado exitosamente!");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Hubo un error al crear el usuario.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Nuevo Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Campo: Nombre */}
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Campo: Correo Electrónico */}
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Campo: Contraseña */}
          <TextField
            fullWidth
            label="Contraseña"
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Campo: Licencia */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Licencia</InputLabel>
            <Select
              name="licencia_id"
              value={formData.licencia_id}
              onChange={handleChange}
              label="Licencia"
              required
            >
              {licencias.map((licencia) => (
                <MenuItem key={licencia.id} value={licencia.id}>
                  {licencia.nombre_licencia} (ID: {licencia.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Botón de Envío */}
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Crear Usuario
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CrearUsuarioForm;

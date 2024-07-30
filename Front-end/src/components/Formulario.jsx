import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';



const Formulario = () => {
  const [formData, setFormData] = useState({
    nombComp: '',
    tipoDoc: '',
    numDoc: '',
    fechaExp: '',
    lugarExp: '',
    fechaNac: '',
    lugarNac: '',
    nacionalidad: '',
    genero: '',
    tipoSangre: '',
    grupoEtnico: '',
    numCelular: '',
    numTel: '',
    email: '',
    estCivil: '',
    cabeFlia: '',
    numPersHogar: '',
    tieneHijos: '',
    numHijos: '',
    tienePersonasCargo: '',
    numeroPersonasCargo: '',
    escolaridad: '',
  });
  

  const [disabledFields, setDisabledFields] = useState({
    numHijos: false,
    numeroPersonasCargo: false,
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setFormData(storedData);
      
      setDisabledFields({
        numHijos: storedData.tieneHijos === 'No',
        numeroPersonasCargo: storedData.tienePersonasCargo === 'No', 
      });
    }
  }, []); 
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem('formData', JSON.stringify(formData));
    history.push('/Form2');
  };

  const handleDateInput = (e) => {
    const input = e.target.value;
    const formattedInput = input
      .replace(/\D/g, '')
      .match(/(\d{0,2})(\d{0,2})(\d{0,4})/)
      .slice(1) 
      .filter(part => part) 
      .join('-'); 
  
    e.target.value = formattedInput;
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const fieldsToDisable = {
      tieneHijos: 'numHijos',
      tienePersonasCargo: 'numeroPersonasCargo',
    };

    if (fieldsToDisable[name]) {
      setDisabledFields((prevDisabledFields) => ({
        ...prevDisabledFields,
        [fieldsToDisable[name]]: value === 'No',
      }));

      if (value === 'No') {
        setFormData({
          ...formData,
          [name]: value,
          [fieldsToDisable[name]]: '',
        });
      }
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className='container_title_form'>
      <label className='Title_form' htmlFor="Form1">INFORMACIÓN PERSONAL</label>
      </div>
      <div className="form-group">
        <label htmlFor="nombComp">Nombre completo:</label>
        <input
          type="text"
          id="nombComp"
          name="nombComp"
          value={formData.nombComp}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tipoDoc">Tipo de documento:</label>
        <select
          id="tipoDoc"
          name="tipoDoc"
          value={formData.tipoDoc}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Cedula cuidadana">Cedula cuidadana</option>
          <option value="Cedula de extrangeria">Cedula de extranjeria</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="numDoc">Numero de documento:</label>
        <input
          type="tel"
          id="numDoc"
          name="numDoc"
          value={formData.numDoc}
          onChange={handleChange}
          required
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
          pattern="\d*"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaExp">Fecha de expedición:</label>
        <input
          placeholder='DD/MM/AAAA'
          type="text"
          id="fechaExp"
          name="fechaExp"
          value= {formData.fechaExp}
          onChange={handleChange}
          onInput={handleDateInput}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lugarExp">Lugar de expedición:</label>
        <input
          type="text"
          id="lugarExp"
          name="lugarExp"
          value={formData.lugarExp}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaNac">Fecha de nacimiento:</label>
        <input
          placeholder='DD/MM/AAAA'
          type="text"
          id="fechaNac"
          name="fechaNac"
          value={formData.fechaNac}
          onChange={handleChange}
          onInput={handleDateInput}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="nacionalidad">Nacionalidad:</label>
        <input
          type="text"
          id="nacionalidad"
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lugarNac">Lugar de nacimiento:</label>
        <input
          type="text"
          id="lugarNac"
          name="lugarNac"
          value={formData.lugarNac}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="genero">Genero:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>          
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tipoSangre">Tipo de sangre:</label>
        <select
          id="tipoSangre"
          name="tipoSangre"
          value={formData.tipoSangre}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="grupoEtnico">Grupo étnico:</label>
        <select
          id="grupoEtnico"
          name="grupoEtnico"
          value={formData.grupoEtnico}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="N/A">N/A</option>
          <option value="Indígenas">Indígenas</option>
          <option value="Afrocolombiano">Afrocolombianos</option>
          <option value="Raizales">Raizales</option>
          <option value="Rom">Rom</option>
          <option value="gitano">Gitano</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="numCelular">Celular:</label>
        <input
          placeholder='(+57)'
          type="tel"
          id="numCelular"
          name="numCelular"
          value={formData.numCelular}
          onChange={handleChange}
          required
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
          maxLength="10"
          pattern="\d{10}"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="numTel">Teléfono:</label>
        <input
          placeholder='(+604)'
          type="tel"
          id="numTel"
          name="numTel"
          value={formData.numTel}
          onChange={handleChange}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
          }}
          maxLength="7"
          pattern="\d{7}"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo electronico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <label htmlFor="estCivil">Estado Civil:</label>
        <select
          id="estCivil"
          name="estCivil"
          value={formData.estCivil}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Soltero/a">Soltero/a</option>
          <option value="Casado/a">Casado/a</option>
          <option value="Unión libre">Unión libre</option>
          <option value="Divorciado/a">Divorciado/a</option>
          <option value="Viudo/a">Viudo/a</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cabeFlia">¿Eres cabeza de familia?:</label>
        <select
          id="cabeFlia"
          name="cabeFlia"
          value={formData.cabeFlia}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="numPersHogar">Personas en el hogar:</label>
        <select
          id="numPersHogar"
          name="numPersHogar"
          value={formData.numPersHogar}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4 o mas">4 o mas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tieneHijos">¿Tienes hijos?:</label>
        <select
          id="tieneHijos"
          name="tieneHijos"
          value={formData.tieneHijos}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="numHijos">Cuantos hijos:</label>
        <select
          id="numHijos"
          name="numHijos"
          value={formData.numHijos}
          onChange={handleSelectChange}
          disabled={disabledFields.numHijos}
          required={!disabledFields.numHijos}
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4 o mas">4 o mas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="tienePersonasCargo">¿Tienes personas a cargo?:</label>
        <select
          id="tienePersonasCargo"
          name="tienePersonasCargo"
          value={formData.tienePersonasCargo}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Si">Si</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="numeroPersonasCargo">Cuantas personas:</label>
        <select
          id="numeroPersonasCargo"
          name="numeroPersonasCargo"
          value={formData.numeroPersonasCargo}
          onChange={handleSelectChange}
          disabled={disabledFields.numeroPersonasCargo}
          required={!disabledFields.numeroPersonasCargo}
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4 o mas">4 o mas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="escolaridad">Escolaridad:</label>
        <select
          id="escolaridad"
          name="escolaridad"
          value={formData.escolaridad}
          onChange={handleSelectChange}
          required
          autoComplete="off"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Técnico">Técnico</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Pregrado">Pregrado</option>
          <option value="Posgrado">Posgrado</option>
          <option value="Especialización">Especialización</option>
          <option value="Maestría">Maestría</option>
          <option value="Doctorado">Doctorado</option>
        </select>
      </div>
      <div className='button-container_one'>
        <button type='submit' className='sig_btn'>Siguiente</button>
      </div>
    </form>
  );
};

export default Formulario;

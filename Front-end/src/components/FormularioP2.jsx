import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import imgtrash from '../styles/images/trash-regular-24.png'

const Form2 = () => {

  const [newFormData, setnewFormData] = useState({
    munResidencia: '',
    barrio: '',
    dirResidencia: '',
    estrato: '',
    zonaUbi: '',
    tipoVivienda: '',
    hogarComp: '',
    servInternet: '',
    grupo_familiar: [],
    personasdisca_grpfam: '',
    tipodisca_grpfam: '',
    srv_Electrico: '',
    srv_Acueducto: '',
    srv_Gas: '',
  });

  const [currentgrpfam, setCurrentgrpfam] = useState({
    nombres_grpfam: '',
    tipdocs_grpfam: '',
    numdocs_grpfam: '',
    parens_grpfam: '',
    oficioescolaridad_grpfam: '',
    contactos_grpfam: '',
  });

  const [disabledFields, setDisabledFields] = useState({
    tipodisca_grpfam: false,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData2'));
    if (storedData) {
      setnewFormData(storedData);
      
      setDisabledFields({
        tipodisca_grpfam: storedData.personasdisca_grpfam === 'No',
      });
    }
  }, []); 
  /*--------------------------------------------------------------------------------------------*/

  const history = useHistory();

  const handleSubmitforms2 = async (e) => {
    e.preventDefault();
  };

  const handleSubmitform2_1 = async (e) => {
    e.preventDefault();
  };

  const handleSubmitform2 = async (e) => {
    e.preventDefault();

    const storedFormData = JSON.parse(localStorage.getItem('formData'));

    localStorage.setItem('formData2', JSON.stringify({ ...storedFormData, ...newFormData }));
    history.push('/Form3');

  };


  const handleChangeform2 = (e) => {
    const { name, value } = e.target;
    setnewFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChangeform2 = (e) => {
    const { name, value } = e.target;
    setnewFormData({
      ...newFormData,
      [name]: value,
    });
    const fieldsToDisable = {
      personasdisca_grpfam: 'tipodisca_grpfam',
    };

    if (fieldsToDisable[name]) {
      setDisabledFields((prevDisabledFields) => ({
        ...prevDisabledFields,
        [fieldsToDisable[name]]: value === 'No',
      }));

      if (value === 'No') {
        setnewFormData({
          ...newFormData,
          [name]: value,
          [fieldsToDisable[name]]: '',
        });
      }
    }
  };


  /*--------------------------------------------------------------------------------------------*/
  const [addgrpfamTrigger, setaddgrpfamTrigger] = useState(false);
  /*--------------------------------------------------------------------------------------------*/


  const handleChangegrpfam = (e) => {
    const { name, value } = e.target;
    setCurrentgrpfam({
      ...currentgrpfam,
      [name]: value
    });
  };
  /*--------------------------------------------------------------------------------------------*/
  const handleAddHabilicomp = () => {
    setaddgrpfamTrigger(true)
  }
  /*--------------------------------------------------------------------------------------------*/

  useEffect(() => {
    if (addgrpfamTrigger) {
      setnewFormData((prevData) => ({
        ...prevData,
        grupo_familiar: [...prevData.grupo_familiar, currentgrpfam]
      }));
      setCurrentgrpfam({
        nombres_grpfam: '',
        tipdocs_grpfam: '',
        numdocs_grpfam: '',
        parens_grpfam: '',
        oficioescolaridad_grpfam: '',
        contactos_grpfam: '',
      });
      setaddgrpfamTrigger(false);
    }
  }, [addgrpfamTrigger, currentgrpfam]);

  /*--------------------------------------------------------------------------------------------*/

  const handelDeleteItemgrpfam = (index) => {
    const newData = { ...newFormData };
    newData.grupo_familiar.splice(index, 1);
    setnewFormData({
      ...newData,
      grupo_familiar: newData.grupo_familiar,
    });
  };

  const handleSelectChangeform2ext = (e) => {
    const { name, value } = e.target;
    setCurrentgrpfam({
      ...currentgrpfam,
      [name]: value,
    });
  };

  const buttonatras = async (e) => {
    localStorage.setItem('formData2', JSON.stringify(newFormData));
    history.push("/")
  }


  return (
    <div>
      <form className="formulario" onSubmit={handleSubmitform2_1}>
        <div className='container_title_form'>
          <label className='Title_form' htmlFor="Form1">INFORMACIÓN DE VIVIENDA</label>
        </div>
        <div className="form-group">
          <label htmlFor="munResidencia">Municipio de residencia:</label>
          <input
            type="text"
            id="munResidencia"
            name="munResidencia"
            value={newFormData.munResidencia}
            onChange={handleChangeform2}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="barrio">Barrio:</label>
          <input
            type="text"
            id="barrio"
            name="barrio"
            value={newFormData.barrio}
            onChange={handleChangeform2}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dirResidencia">Dirección de residencia:</label>
          <input
            placeholder='Cll, Cr, # '
            type="text"
            id="dirResidencia"
            name="dirResidencia"
            value={newFormData.dirResidencia}
            onChange={handleChangeform2}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estrato">Estrato:</label>
          <select
            id="estrato"
            name="estrato"
            value={newFormData.estrato}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zonaUbi">Zona en la que se ubica:</label>
          <select
            id="zonaUbi"
            name="zonaUbi"
            value={newFormData.zonaUbi}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Rural">Rural</option>
            <option value="Urbana">Urbana</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tipoVivienda">Tipo de vivienda:</label>
          <select
            id="tipoVivienda"
            name="tipoVivienda"
            value={newFormData.tipoVivienda}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Propia">Propia</option>
            <option value="Arrendada">Arrendada</option>
            <option value="Familiar">Familiar</option>
            <option value="Compartida">Compartida</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hogarComp">¿En su hogar hay computador?:</label>
          <select
            id="hogarComp"
            name="hogarComp"
            value={newFormData.hogarComp}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="servInternet">¿Cuenta con servicio de internet?:</label>
          <select
            id="servInternet"
            name="servInternet"
            value={newFormData.servInternet}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="srv_Electrico">Su hogar cuenta con servicios de energía eléctrica:</label>
          <select
            id="srv_Electrico"
            name="srv_Electrico"
            value={newFormData.srv_Electrico}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="srv_Acueducto">Su hogar cuenta con servicios de acueducto:</label>
          <select
            id="srv_Acueducto"
            name="srv_Acueducto"
            value={newFormData.srv_Acueducto}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="srv_Gas">Su hogar cuenta con servicios de gas natural:</label>
          <select
            id="srv_Gas"
            name="srv_Gas"
            value={newFormData.srv_Gas}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
      </form>
      <form className="formulario" onSubmit={handleSubmitforms2}>
        <div>
          <div className='container_title_form'>
            <label className='Title_form' htmlFor="Form1">GRUPO FAMILIAR</label>
          </div>
          <div className="form-group">
            <label htmlFor="nombres_grpfam">Nombre:</label>
            <input
              type="text"
              id="nombres_grpfam"
              name="nombres_grpfam"
              value={currentgrpfam.nombres_grpfam}
              onChange={handleChangegrpfam}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipdocs_grpfam">Tipo de documento:</label>
            <select
              id="tipdocs_grpfam"
              name="tipdocs_grpfam"
              value={currentgrpfam.tipdocs_grpfam}
              onChange={handleSelectChangeform2ext}
              autoComplete="off"
            >
              <option value="" disabled hidden>Seleccione</option>
              <option value="Cedula cuidadana">Cedula cuidadana</option>
              <option value="Cedula extrangera">Cedula extranjera</option>
              <option value="Tarjeta de identidad">Tarjeta de identidad</option>
              <option value="Registro civil">Registro civil</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numdocs_grpfam"># de documento:</label>
            <input
              placeholder='#'
              type="tel"
              id="numdocs_grpfam"
              name="numdocs_grpfam"
              value={currentgrpfam.numdocs_grpfam}
              onChange={handleChangegrpfam}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }}
              pattern="\d*"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="parens_grpfam">Parentesco:</label>
            <input
              type="text"
              id="parens_grpfam"
              name="parens_grpfam"
              value={currentgrpfam.parens_grpfam}
              onChange={handleChangegrpfam}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="oficioescolaridad_grpfam">Oficio/Escolaridad:</label>
            <input
              type="text"
              id="oficioescolaridad_grpfam"
              name="oficioescolaridad_grpfam"
              value={currentgrpfam.oficioescolaridad_grpfam}
              onChange={handleChangegrpfam}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactos_grpfam">Contacto:</label>
            <input
              placeholder='(+57)'
              type="tel"
              id="contactos_grpfam"
              name="contactos_grpfam"
              value={currentgrpfam.contactos_grpfam}
              onChange={handleChangegrpfam}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
              }}
              maxLength="10"
              pattern="\d{10}"
              autoComplete="off"
            />
          </div>
          <button className='sig_btn' onClick={handleAddHabilicomp} type="button">Añadir</button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className='td_thspecial'>Nombre</th>
                <th className='td_thspecial'>Tipo de documento</th>
                <th className='td_thspecial'># de documento</th>
                <th className='td_thspecial'>Parentesco</th>
                <th className='td_thspecial'>Oficio/Escolaridad</th>
                <th className='td_thspecial'>Contacto</th>
                <th className='td_thspecial'></th>
              </tr>
            </thead>
            <tbody >
              {newFormData.grupo_familiar.map((grpfam, index) => (
                <tr key={index}>
                  <td className='td_thspecial'>{grpfam.nombres_grpfam}</td>
                  <td className='td_thspecial'>{grpfam.tipdocs_grpfam}</td>
                  <td className='td_thspecial'>{grpfam.numdocs_grpfam}</td>
                  <td className='td_thspecial'>{grpfam.parens_grpfam}</td>
                  <td className='td_thspecial'>{grpfam.oficioescolaridad_grpfam}</td>
                  <td className='td_thspecial'>{grpfam.contactos_grpfam}</td>
                  <td>
                    <button onClick={() => handelDeleteItemgrpfam(index)}><img src={imgtrash} alt="My SVG" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <form className='formulario' onSubmit={handleSubmitform2}>
        <div className="form-group">
          <label htmlFor="personasdisca_grpfam">¿Vive con personas con discapacidad?:</label>
          <select
            id="personasdisca_grpfam"
            name="personasdisca_grpfam"
            value={newFormData.personasdisca_grpfam}
            onChange={handleSelectChangeform2}
            required
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tipodisca_grpfam">¿Que tipo de discapacidad tiene la persona?:</label>
          <select
            id="tipodisca_grpfam"
            name="tipodisca_grpfam"
            value={newFormData.tipodisca_grpfam}
            onChange={handleSelectChangeform2}
            disabled={disabledFields.tipodisca_grpfam}
            required={!disabledFields.tipodisca_grpfam}
            autoComplete="off"
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="Sensorial">Sensorial</option>
            <option value="Mental">Mental</option>
            <option value="Fisica">Fisica</option>
            <option value="Multiple">Multiple</option>
            <option value="Otras">Otras</option>
          </select>
        </div>
        <div className='button-container'>
          <button type='button' className='sig_btn' onClick={buttonatras}>Atras</button>
          <button type='submit' className='sig_btn'>Siguiente</button>
        </div>
      </form>
    </div>
  );
};

export default Form2;
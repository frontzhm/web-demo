import axios from 'axios'

const AjaxQuery = (params) => axios.post('http://localhost:3333/query', params)
const AjaxExportTable = (params) => axios.post('http://localhost:3333/query', params)
const AjaxGetAreas = (params) => axios.post('http://localhost:3333/getAreas', params)
export default {
  AjaxQuery,
  AjaxExportTable,
  AjaxGetAreas
}

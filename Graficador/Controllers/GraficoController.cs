using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Graficador.Models;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Graficador.Controllers
{
    public class GraficoController : Controller
    {
        public IActionResult IngresarDatos()
        {
            return View();
        }

        [HttpPost]

        public IActionResult MostrarGrafico(GraficoViewModel model, int? borderRadius, string ValoresInferiores, string ValoresSuperiores)
        {
            if (model != null)
            {
                var etiquetas = model.Etiquetas?.Split(',').Select(s => s.Trim()).ToList() ?? new List<string>();
                var valores = model.Valores?.Split(',').Select(s => int.TryParse(s.Trim(), out var v) ? v : 0).ToList() ?? new List<int>();
                List<int> valoresInferioresList = ValoresInferiores?.Split(',').Select(s => int.TryParse(s.Trim(), out var v) ? v : 0).ToList();
                List<int> valoresSuperioresList = ValoresSuperiores?.Split(',').Select(s => int.TryParse(s.Trim(), out var v) ? v : 0).ToList();
                if (etiquetas.Count != valores.Count || etiquetas.Count == 0)
                {
                    ViewBag.Error = "La cantidad de etiquetas y valores debe ser la misma y mayor que cero.";
                    return View("IngresarDatos", model);
                }
                ViewBag.Etiquetas = JsonSerializer.Serialize(etiquetas);
                ViewBag.Valores = JsonSerializer.Serialize(valores);
                ViewBag.TipoGrafico = model.TipoGrafico;
                ViewBag.TituloGrafico = model.TituloGrafico;
                ViewBag.BorderRadius = borderRadius;
                ViewBag.ValoresInferiores = JsonSerializer.Serialize(valoresInferioresList);
                ViewBag.ValoresSuperiores = JsonSerializer.Serialize(valoresSuperioresList);
                return View("MostrarGrafico");
            }
            return View("IngresarDatos", model);
        }

        [HttpGet]
        public IActionResult SubirJson()
        {
            ViewBag.Categorias = new List<SelectListItem>
            {
                new SelectListItem { Text = "Gráficos de Barras", Value = "barras" },
                new SelectListItem { Text = "Gráficos de Líneas", Value = "lineas" },
                new SelectListItem { Text = "Gráficos Circulares", Value = "circulares" },
                new SelectListItem { Text = "Gráficos de Área", Value = "area" },
                new SelectListItem { Text = "Gráficos Especiales", Value = "especiales" }
            };

            ViewBag.TiposGrafico = new List<SelectListItem>(); // se llenará con JS según la categoría

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SubirJson(IFormFile archivoJson)
        {
            if (archivoJson == null || archivoJson.Length == 0)
            {
                ViewBag.Mensaje = "Archivo no válido.";
                return View();
            }

            using var stream = new StreamReader(archivoJson.OpenReadStream());
            var contenido = await stream.ReadToEndAsync();

            DatosGraficoJson datos;
            try
            {
                datos = JsonSerializer.Deserialize<DatosGraficoJson>(contenido);
            }
            catch (Exception ex)
            {
                ViewBag.Mensaje = "Error al leer el JSON: " + ex.Message;
                return View();
            }

            ViewBag.TipoGrafico = datos.Tipo;
            ViewBag.Titulo = datos.Titulo;
            ViewBag.Etiquetas = JsonSerializer.Serialize(datos.Etiquetas);
            ViewBag.Valores = JsonSerializer.Serialize(datos.Valores);
            ViewBag.ValoresSuperiores = JsonSerializer.Serialize(datos.ValoresSuperiores);
            ViewBag.ValoresInferiores = JsonSerializer.Serialize(datos.ValoresInferiores);
            ViewBag.BorderRadius = datos.BorderRadius;

            return View("GraficoDesdeJson");
        }

        [HttpPost]
        public async Task<IActionResult> ProcesarJson(IFormFile jsonFile, string tipoGrafico)
        {
            if (jsonFile == null || jsonFile.Length == 0)
                return BadRequest("Archivo no válido.");

            using var reader = new StreamReader(jsonFile.OpenReadStream());
            var contenido = await reader.ReadToEndAsync();

            var datos = JsonSerializer.Deserialize<DatosGraficoJson>(contenido);

            ViewBag.Etiquetas = JsonSerializer.Serialize(datos.Etiquetas);
            ViewBag.Valores = JsonSerializer.Serialize(datos.Valores);
            ViewBag.TituloGrafico = datos.Titulo;
            ViewBag.TipoGrafico = tipoGrafico;

            var datosJson = new
            {
                labels = datos.Etiquetas,
                data = datos.Valores,
                label = datos.Titulo
            };
            ViewBag.DatosJson = JsonSerializer.Serialize(datosJson);


            return View("MostrarJson");
        }

    }
}





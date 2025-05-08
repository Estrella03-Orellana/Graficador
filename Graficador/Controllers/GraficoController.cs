using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Graficador.Models;
using System.Linq;
using System.Text.Json;

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

    }
}





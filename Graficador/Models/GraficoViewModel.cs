namespace Graficador.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class GraficoViewModel
{

    [Required(ErrorMessage = "Por favor, ingresa las etiquetas.")]
    public string Etiquetas { get; set; } // Las etiquetas separadas por comas
    [Required(ErrorMessage = "Por favor, ingresa los valores.")]
    public string Valores { get; set; } // Los valores separados por comas

    [Required(ErrorMessage = "Seleccione un tipo de gráfico")]
    public string TipoGrafico { get; set; } = "bar"; // Por defecto, gráfico de barras
    public string TituloGrafico { get; set; } = "Gráfico Personalizado";

}




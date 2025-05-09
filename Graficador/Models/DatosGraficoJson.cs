namespace Graficador.Models
{
    public class DatosGraficoJson
    {
        public string Tipo { get; set; }
        public string Titulo { get; set; }
        public List<string> Etiquetas { get; set; }
        public List<double> Valores { get; set; }

        // Otros opcionales según el tipo de gráfico
        public List<double> ValoresSuperiores { get; set; }
        public List<double> ValoresInferiores { get; set; }
        public int? BorderRadius { get; set; }
    }
}

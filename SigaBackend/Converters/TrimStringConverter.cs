using System.Text.Json;
using System.Text.Json.Serialization;

namespace SigaBackend.Converters;

public class TrimStringConverter : JsonConverter<string>
{
  public override string? Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
      => reader.GetString()?.Trim();

  public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
      => writer.WriteStringValue(value);
}
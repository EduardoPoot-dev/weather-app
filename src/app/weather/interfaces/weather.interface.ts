export interface Weather {
  latitude:              number;
  longitude:             number;
  generationtime_ms:     number;
  utc_offset_seconds:    number;
  timezone:              string;
  timezone_abbreviation: string;
  elevation:             number;
  hourly_units:          HourlyUnits;
  hourly:                Hourly;
  daily_units:           DailyUnits;
  daily:                 Daily;
}

export interface Daily {
  time:                      string[];
  temperature_2m_max:        string[];
  temperature_2m_min:        string[];
  apparent_temperature_mean: number[];
  wind_speed_10m_max:        number[];
  precipitation_sum:         number[];
  weather_code:              number[];
}

export interface DailyUnits {
  time:                      string;
  temperature_2m_max:        string;
  temperature_2m_min:        string;
  apparent_temperature_mean: string;
  wind_speed_10m_max:        string;
  weather_code:              string;
  precipitation_sum:         string;
}

export interface Hourly {
  time:           string[];
  temperature_2m: number[];
  weather_code:   number[];
  relative_humidity_2m: number[];
}

export interface HourlyUnits {
  time:                         string;
  temperature_2m:               string;
  weather_code:                 string;
  relative_humidity_2m:         string;
}

# EvaMetrics

Desenvolvida como uma aplicação web utilizando TypeScript com o framework NextJS, a EvaMetrics foi projetada para:
* Padronizar o processo de cálculo das métricas de avaliação
* Garantir imparcialidade na comparação entre as ferramentas
* Fornecer uma interface intuitiva para visualização dos resultados
* Permitir a exportação dos dados para análise complementar

Disponível em [https://evametrics.vercel.app](https://evametrics.vercel.app)

Exemplo de arquivo de entrada GoldIndexing:

```csv
﻿D1: corn, female plants, flowering, hybrids, meteorological parameters, models, pollen, production functions, regression analysis, seed set, Flowering characteristics, Water deficit, Relative evapotranspiration, Maize pollen density, Seed-set capacity
D2: biochemical oxygen demand, cost benefit analysis, crops, economic sustainability, fertilizers, groundwater, infrastructure, irrigated farming, irrigation requirement, nutrients, rain, sugarcane, surface water, tariffs, taxes, wastewater, wastewater irrigation, wastewater treatment, watersheds, Colombia, Latin America, Agricultural irrigation, Cost-Benefit Analysis, Wastewater reuse, Water pollution control, 3-SSA
D3: Sorghum (Poaceae), canopy, composts, deficit irrigation, field experimentation, forage, forage yield, harvest index, irrigation rates, irrigation water, leaf area, leaves, mulching, photosynthesis, physiological response, pigments, plant growth, plant height, reclaimed soils, rice straw, seed yield, soil amendments, soil water, temperature, water content, water stress, water use efficiency, Sorghum, Moisture regimes, WUE, Plant water status, Morpho-Physiological, Attributes
D4: biomass, canopy, carbon dioxide fixation, corn, crop losses, crops, deficit irrigation, evapotranspiration, filling period, flowering, grain yield, irrigation rates, leaf area index, leaf curling, photochemistry, photosystem II, soil water, stomatal movement, vegetative growth, water shortages, water stress, xylem, Colorado, SDI, DI, Limited irrigation, Evapotranspiration, Water productivity, WP
D5: agricultural policy, algorithms, climatic factors, cost effectiveness, crop yield, evapotranspiration, growing season, leaf area index, models, prediction, semiarid zones, soil properties, time series analysis, water resources, yield forecasting, Automatic calibration, Dryland, Multi-objective optimization, Sensitivity analysis
D6: Amaranthus cruentus, Beta vulgaris subsp. vulgaris, Gynandropsis gynandra, aboveground biomass, beta-carotene, data collection, drought, evapotranspiration, flowers, green leafy vegetables, harvest index, households, infants, iron, irrigation management, nutrient content, nutrient intake, plant density, planting date, planting density, rain, soil types, vitamin A, water stress, zinc, South Africa, Deficit irrigation, Hidden hunger, African leafy vegetables, Micronutrient deficiency, Irrigation regimes, Indigenous leafy vegetables
D7: fertigation, fertilizer rates, field experimentation, groundwater contamination, growing season, irrigation rates, leaching, microirrigation, model validation, models, nitrates, nitrogen, nitrogen fertilizers, rain, soil, solutes, HYDRUS (2D/3D), Nitrate leaching, Nitrogen uptake, Particle swarm optimization (PSO), Simulation
D8: climate change, decision making, drought, freshwater, industry, irrigation management, irrigation water, politics, public services and goods, resource management, risk, semiarid zones, water security, water stress, water use efficiency, Water crisis, Water efficiency, Agriculture sector, Water management, SWOT/PESTLE analysis, TOWS matrix, Bottleneck analysis, Iran
D9: equations, field capacity, hydraulic conductivity, mercury, models, soil matric potential, soil water, tensiometers, Tensiometer, Inverse modeling, Propagation of errors
D10: Solanum tuberosum, aeration, crop yield, evaporation, field experimentation, heat, microirrigation, models, mulching, plastic film mulches, potatoes, rain, raised beds, semiarid zones, soil depth, soil temperature, soil water, soil water characteristic, soil water movement, thermal properties, uncertainty, Soil water and heat, Full plastic-film mulch, Surface drip irrigation, Potato, Soil hydraulic parameters, HYDRUS-2D
```

Exemplo de arquivo de entrada de Dataset

```csv
ID;Titulo;Descriptores
D1;Simulating kernel number under different water regimes using the Water-Flowering Model in hybrid maize seed production;"corn, China, pollen, simulation models, females, hybrids, seed set, models, model validation, flowering"
D2;Financial aspects of reclaimed wastewater irrigation in three sugarcane production areas in the Upper Cauca river Basin, Colombia;"Colombia, sugarcane, infrastructure, Latin America, viability, rain, wastewater irrigation, wastewater, watersheds, groundwater"
D3;Compost and mulching modulates morphological, physiological responses and water use efficiency in sorghum (bicolor L. Moench) under low moisture regime;"harvest index, Sorghum bicolor, water use efficiency, leaf area index, plant height, forage yield, seed yield, composts, rice, canopy"
D4;Water productivity under strategic growth stage-based deficit irrigation in maize;"corn, stomatal conductance, deficit irrigation, evapotranspiration, leaf area index, grain yield, canopy, photochemistry, Colorado, photosystem II"
D5;Simultaneous calibration of evapotranspiration and crop yield in agronomic system modeling using the APEX model;"evapotranspiration, leaf area index, crop yield, time series analysis, algorithms, soil, evolution, simulation models, growing season, models"
D6;Nutritional water productivity of selected leafy vegetables;"Beta vulgaris subsp. vulgaris, zinc, evapotranspiration, harvest index, Gynandropsis gynandra, iron, water stress, South Africa, green leafy vegetables, drought"
D7;Developing an optimization model in drip fertigation management to consider environmental issues and supply plant requirements;"fertigation, microirrigation, nitrogen, rain, corn, leaching, groundwater contamination, nutrient uptake, simulation models, nitrogen fertilizers"
D8;Irrigation water management in Iran;"Iran, politics, water use efficiency, drought, climate change, irrigation management, water management, freshwater, irrigation water, water stress"
D9;Comparison of devices for measuring soil matric potential and effects on soil hydraulic functions and related parameters;"soil matric potential, mercury, tensiometers, equations, soil water, pressure gauges, field capacity, soil water content, hydraulic conductivity, models"
D10;Simulation of soil water flow and heat transport in drip irrigated potato field with raised beds and full plastic-film mulch in a semiarid area;"potatoes, raised beds, microirrigation, Solanum tuberosum, simulation models, soil water movement, soil water content, semiarid zones, water use efficiency, rain"
```

## Caso queira executar localmente
```bash
git clone git@github.com:marcoweb/evametrics.git
cd evametrics
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu browser.


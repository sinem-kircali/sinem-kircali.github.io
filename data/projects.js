/*
 * PROJECT DATA
 * ------------
 * Edit this file to add, remove, or update project entries — no changes to
 * layout/styling code are needed. The projects grid in index.html renders
 * automatically from the PROJECTS array below, with the filter chips above it.
 *
 * Fields:
 *   id           - optional short slug (string). The card gets the page anchor
 *                  #project-<id>, so other sections (e.g. the education entries in
 *                  the timeline) can link straight to it. Defaults to a slug of the title.
 *   context      - optional small line above the title saying where the project came
 *                  from (e.g. "Koç BSc · INDR 252 Applied Statistics"). Only fill this
 *                  in when you're sure of the source.
 *   title        - project name (string)
 *   summary      - one-line summary shown on the card (string)
 *   problem      - the problem/context (string)
 *   approach     - what was done, methods/tools used (string)
 *   tools        - array of strings, rendered as mono tags (e.g. ["Python", "XGBoost"])
 *   outcome      - impact/result statement (string)
 *   metric       - short headline stat shown next to the icon, mono font
 *                  (e.g. "2.35M+ price records", "0.891 ROC AUC")
 *   icon         - one of: "trend", "scatter", "bars", "network", "waves",
 *                  "pulse", "cluster", "grid", "flow" — picks a small
 *                  decorative SVG rendered on the card (see js/main.js)
 *   themes       - array of filter keys the card appears under: "ml", "nlp", "marketing",
 *                  "ops", "stats", "data" (same headings as the GitHub profile README)
 *   featured     - true to show the card in the default "Featured" view
 *   github       - repo URL, or null while there is no public repo yet (the card then
 *                  says "Repository coming soon")
 *   caseStudyUrl - optional external write-up URL, or null
 *   comingSoon   - optional boolean. When true, the card shows a playful
 *                  "coming soon" badge (animated dot-loader) instead
 *                  of the outcome line. Drop a GIF at
 *                  assets/coming-soon.gif to replace the loader with that
 *                  image automatically (see js/main.js).
 *
 * Numbers and findings below come from the READMEs of the repos on GitHub (and, for the
 * industry-linked cards, the CV).
 */

const PROJECTS = [
  // ---------------------------------------------------------------------------------------
  // Featured — the same six as the "Featured projects" table on the GitHub profile
  // ---------------------------------------------------------------------------------------
  {
    id: "competitor-pricing",
    context: "Erasmus MSc · FEM11153 Seminar Case Studies in Data Science & Marketing Analytics",
    title: "Competitor Pricing Dynamics",
    summary: "Which competitors react to a price change, how fast, and who leads — across 2.35M+ scraped price records.",
    problem:
      "When a leading Dutch online electronics retailer (“Company X”) changes a price, do competitors react, how quickly, and which of them lead versus follow? Its pricing team needed the why behind competitor moves, not just a log of them. The data: high-frequency scraped prices for mobile phones and vacuum cleaners in the Netherlands and Belgium.",
    approach:
      "Turned raw price scrapes into an event-by-competitor panel (a competitor “responds” if it reprices within 24 hours). Modeled whether competitors respond (mixed-effects logit), when (discrete-time hazard, standard errors clustered by competitor) and which role they take — leader, follower or no action (multinomial logit). Then clustered competitors into behavioral archetypes (k-means, k = 3 per category) and stress-tested the findings across risk-set definitions and lookback windows.",
    tools: ["R", "Mixed-Effects Models", "Hazard Models", "Multinomial Logit", "Clustering"],
    outcome:
      "Promotions trigger up to a 3.2× increase in competitor response probability, which shaped the commercial team's promotional pricing guardrails. Competitor-specific monitoring playbooks (e.g. 2–4h windows for fast reactors, 8–12h for selective responders) were adopted by the retailer's pricing team.",
    metric: "2.35M+ price records",
    icon: "scatter",
    themes: ["marketing"],
    featured: true,
    github: "https://github.com/sinem-kircali/competitor-pricing-dynamics",
    caseStudyUrl: null,
  },
  {
    id: "telco-retention",
    context: "Retention case study · public IBM Telco dataset",
    title: "Telco Churn: From Model to Contact List",
    summary: "Which customers to contact this month, with what action, and what it's worth — ranked by risk × value.",
    problem:
      "Most churn projects stop at “the model has an AUC of 0.85”. This one starts from the decision a retention team makes every month: who to contact, with what action, and what that is worth in euros — on the public IBM Telco dataset (7,043 customers).",
    approach:
      "A leakage-safe workflow (split before EDA, test set of 1,409 customers used once) with eight hypotheses written down before modeling. Nested cross-validation compared logistic regression with XGBoost on PR-AUC (0.673 vs 0.668), so the explainable model won. Then an expected-value calculation per contact — churn probability × offer success rate × margin × monthly charge − contact cost — with sensitivity analysis and a fairness audit.",
    tools: ["Python", "scikit-learn", "XGBoost", "statsmodels", "Nested CV"],
    outcome:
      "On held-out data the top 20% by predicted risk holds 68% real leavers (27% at random) and reaches 52% of all churners. Ranking by risk × value gives ≈ €4,750 per 1,000 customers per campaign, about 4× a simple business rule.",
    metric: "Top 20% = 68% real churners",
    icon: "bars",
    themes: ["ml", "marketing"],
    featured: true,
    github: "https://github.com/sinem-kircali/telco-churn-retention-targeting",
    caseStudyUrl: null,
  },
  {
    id: "market-risk-toolkit",
    context: "Personal project",
    title: "Market Risk Toolkit",
    summary: "VaR, Expected Shortfall, stress testing, and regime detection on real portfolio prices.",
    problem:
      "Wanted to move beyond reading about market risk measures and actually compute them on real prices — Value at Risk, Expected Shortfall, and stress scenarios are usually treated as abstract formulas rather than working tools.",
    approach:
      "Built a toolkit implementing VaR via three methods (historical simulation, parametric, Monte Carlo), Expected Shortfall/CVaR, scenario stress testing (equity shock, volatility spike, correlation breakdown), and Markov-based regime detection (calm vs. volatile states) with VaR backtesting against realized returns. It also documents its own limits: parametric VaR underestimates fat tails, and the two-state regime model is a first approximation, not a forecasting tool.",
    tools: ["Python", "Monte Carlo", "Markov Regimes", "Streamlit"],
    outcome:
      "A working, interactive toolkit (notebook + dashboard) for computing and backtesting portfolio risk measures — extending stochastic-modeling ideas from an Operations Research background into a financial-markets application.",
    metric: "3 VaR methods",
    icon: "waves",
    themes: ["ops"],
    featured: true,
    github: "https://github.com/sinem-kircali/market-risk-toolkit",
    caseStudyUrl: null,
  },
  {
    id: "pricing-revenue-management",
    context: "Koç BSc · INDR 475 Pricing & Revenue Management · pair project",
    title: "Pricing & Revenue Management",
    summary: "Estimates how demand responds to price, then finds profit-maximizing prices for four cases — solved with Gurobi.",
    problem:
      "Starting from a 151-day online price experiment, how does demand respond to price — and what are the best prices under a single price, market segmentation with cannibalization, day-of-week pricing, and a capacity-constrained 400-seat theatre?",
    approach:
      "Fitted linear, exponential and logit price-response models, then split demand into conversion rate × potential demand (visitors) to cut forecast error. Solved each pricing decision as an optimization model in Gurobi, including a non-convex QP for segmentation. Merged two homework notebooks into one analysis and audited the original code, fixing leakage and scoring errors.",
    tools: ["Python", "Gurobi", "statsmodels", "Price-Response Models"],
    outcome:
      "Adding conversion rate and potential demand halved the price-only forecast error (test MAPE 12.7%). For the theatre, daily prices lifted revenue by 49% (two prices: +35%), and segmentation beat a single price only while cannibalization stayed below 0.16.",
    metric: "+49% revenue with daily prices",
    icon: "trend",
    themes: ["marketing", "ops"],
    featured: true,
    github: "https://github.com/sinem-kircali/pricing-revenue-management",
    caseStudyUrl: null,
  },
  {
    id: "llm-prompting-finetuning",
    context: "Erasmus MSc · FEM11154 Large Language Models for Marketing",
    title: "LLM Prompting vs. Fine-Tuning: Yelp Star Prediction",
    summary: "Compares prompt engineering and DistilBERT fine-tuning for predicting review star ratings.",
    problem:
      "Compare three approaches to predicting 1–5 star ratings from 19,896 Yelp restaurant reviews — system-prompt design, zero/one/few-shot prompting, and supervised fine-tuning — to understand the trade-offs between LLM prompting and traditional fine-tuning.",
    approach:
      "Evaluated two system-prompt personas (analyst vs. marketing consultant) and zero/one/few-shot prompting on Llama 3.1 8B via the Groq API, using a stratified 100-review sample. Then fine-tuned DistilBERT (full vs. head-only) on 800 labeled reviews, comparing accuracy, MAE, and per-class precision/recall.",
    tools: ["Python", "LLM Prompting", "DistilBERT", "Fine-Tuning"],
    outcome:
      "Zero-shot prompting outperformed few-shot (66% vs. 54% accuracy) because in-context examples anchored the model. Fully fine-tuned DistilBERT reached 47.5% accuracy but runs locally with no API calls or external data exposure — a real deployment trade-off, not just an accuracy one.",
    metric: "66% zero-shot accuracy",
    icon: "network",
    themes: ["nlp"],
    featured: true,
    github: "https://github.com/sinem-kircali/llm-prompting-finetuning-yelp-reviews",
    caseStudyUrl: null,
  },
  {
    id: "customer-segmentation",
    context: "Erasmus MSc · FEM11150 Strategic Marketing Decision Making + FEM11152",
    title: "Customer Segmentation: When k-means Misleads",
    summary: "Revenue-based hotel guest segments, and why k-means on one-hot data can mislead (vs. Gower distance + PAM).",
    problem:
      "Two segmentation cases merged into one analysis: which hotel-guest segments generate the revenue and how to target them (a group assignment in Strategic Marketing Decision Making), and what user types exist in a social-app dataset with mixed demographic data (an individual assignment in Seminar Data Science for Marketing Analytics).",
    approach:
      "Hotel guests (9,384 customers, 9 behavioral variables): k-means with k = 4, segments profiled by average and total revenue contribution, then re-run on log-transformed revenue to test robustness (adjusted Rand index 0.27). App users (1,113): compared k-means on one-hot dummies against Gower distance + PAM, with k chosen by silhouette.",
    tools: ["R", "k-means", "Gower + PAM", "R Markdown"],
    outcome:
      "One high-value segment (11% of guests) generates 53% of lodging and 54% of ancillary revenue. On the app data, k-means simply copied single dummy columns (100% female / 100% male segments), while Gower + PAM found the real structure: mostly married women vs. mostly single men.",
    metric: "11% of guests → 53% of revenue",
    icon: "cluster",
    themes: ["marketing", "ml"],
    featured: true,
    github: "https://github.com/sinem-kircali/customer-segmentation-kmeans",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // Machine learning & predictive modelling
  // ---------------------------------------------------------------------------------------
  {
    id: "qnb-churn",
    context: "Koç BSc · INDR 491 Design in Industrial Engineering I (senior capstone)",
    title: "Customer Churn Prediction — QNB Finansbank",
    summary: "Churn model benchmarked on 75K+ banking customers and 47 features — ~75% AUC identifying high-risk customers.",
    problem:
      "Identify credit card customers at risk of churning, using an anonymized dataset of 47 features (20 categorical, 27 numerical) and a binary churn target — so retention effort could focus on the customers most likely to leave. My senior capstone project at Koç University.",
    approach:
      "Built the full pipeline in Python: exploratory analysis, MICE imputation, one-hot encoding, then logistic regression as a baseline and a gradient boosting classifier tuned with grid search and 5-fold stratified cross-validation, benchmarked on AUC-ROC against a held-out test set.",
    tools: ["Python", "Scikit-learn", "Logistic Regression", "Gradient Boosting"],
    outcome:
      "Reached ~75% AUC in identifying high-risk customers and estimated a ~15% retention improvement among at-risk customers (~$18B+ in transaction value), connecting model output and trade-offs to revenue impact for senior stakeholders.",
    metric: "~75% AUC · 75K+ customers",
    icon: "pulse",
    themes: ["ml"],
    github: "https://github.com/sinem-kircali/customer-churn-prediction",
    caseStudyUrl: null,
  },
  {
    id: "master-thesis",
    context: "Erasmus MSc · FEM11155 Master's Thesis",
    title: "Master's Thesis — Delivery Performance & Customer Satisfaction",
    summary: "Machine learning, statistical inference, and topic modeling applied to how delivery performance shapes customer satisfaction.",
    problem:
      "Understanding how delivery performance shapes customer satisfaction, using retail/e-commerce transactional data (Olist-style dataset).",
    approach:
      "Combining machine learning, statistical inference, and topic modeling on e-commerce transactional data, under the supervision of Sara Bagheri at Erasmus University Rotterdam.",
    tools: ["Python", "Machine Learning", "Statistical Inference", "Topic Modeling"],
    outcome:
      "Completed as of 1 November 2026. Full write-up and results coming soon.",
    metric: "Completed by 1 Nov 2026",
    icon: "trend",
    themes: ["ml", "nlp"],
    github: null,
    caseStudyUrl: null,
    comingSoon: true,
  },
  {
    id: "spotify-hit-prediction",
    context: "Erasmus MSc · FEM11152 Seminar Data Science for Marketing Analytics",
    title: "Spotify Hit Prediction with Explainability",
    summary: "Random Forest vs. XGBoost predicting Spotify hits, with SHAP and ICE-based interpretability.",
    problem:
      "Predict whether a Spotify track becomes a \"hit\" (popularity ≥ 70) from audio and playlist features alone, and understand which features actually drive that prediction rather than treating the model as a black box.",
    approach:
      "Trained Random Forest and XGBoost classifiers (5-fold stratified CV, hyperparameter search) on 32,833 tracks with an 85/15 class imbalance, then applied global permutation importance, SHAP, and ICE plots to interpret the winning model.",
    tools: ["R", "tidymodels", "XGBoost", "SHAP"],
    outcome:
      "XGBoost selected as the final model (ROC AUC 0.891 vs. 0.868 for Random Forest, F1 0.667 vs. 0.330). Instrumentalness, loudness, and energy emerged as the strongest global predictors of hit likelihood.",
    metric: "0.891 ROC AUC",
    icon: "cluster",
    themes: ["ml"],
    github: "https://github.com/sinem-kircali/spotify-hit-prediction-xai",
    caseStudyUrl: null,
  },
  {
    id: "nasdaq-volatility",
    context: "Erasmus MSc · FEM11152 Seminar Data Science for Marketing Analytics",
    title: "NASDAQ Volatility Forecasting",
    summary: "XGBoost forecast of 30-day NASDAQ volatility with PDP, ALE, and SHAP interpretability.",
    problem:
      "Volatility forecasts drive portfolio risk, leverage constraints, and margin calls — but a model that's accurate yet opaque is hard to trust for real financial decisions.",
    approach:
      "Engineered lagged-volatility and return-based features from 10 years of daily NASDAQ data to capture volatility clustering, trained an XGBoost model with conservative, overfitting-averse settings on a chronological 80/20 split, and applied Partial Dependence Plots, Accumulated Local Effects, and SHAP for full global interpretability.",
    tools: ["R", "XGBoost", "DALEX", "Time Series"],
    outcome:
      "Lagged volatility features proved to be the key driver of forecast accuracy, confirming that volatility is path-dependent rather than purely noise-driven.",
    metric: "10 years daily data",
    icon: "waves",
    themes: ["ml"],
    github: "https://github.com/sinem-kircali/nasdaq-volatility-xgboost",
    caseStudyUrl: null,
  },
  {
    id: "transport-mode-choice",
    context: "Erasmus MSc · FEM11152 Seminar Data Science for Marketing Analytics",
    title: "Car or Public Transport? Commuter Mode Choice",
    summary: "Random forest vs. logistic regression when 85% of commuters drive — where accuracy misleads and the threshold matters.",
    problem:
      "Predict and explain whether commuters outside Sweden's metropolitan regions drive or take public transport, when 85% of them drive — so a model that always says “car” is already 85% accurate. An individual assignment, extended with a logistic regression benchmark and imbalance-aware evaluation.",
    approach:
      "Tuned a random forest (500 trees, mtry chosen on out-of-bag error) and benchmarked it against a logistic regression, judging both on balanced accuracy, class-wise recall and AUC (DeLong test) rather than accuracy alone, and moving the decision threshold to the base rate.",
    tools: ["R", "Random Forest", "Logistic Regression", "pROC"],
    outcome:
      "Moving the threshold to the car share lifts public-transport recall from 0.27 to 0.67. The forest isn't significantly better than the logit (DeLong p = 0.66), and travel-time competitiveness drives the choice: the probability of driving rises from 0.61 to 0.91 as public transport takes 1.5× to 3× the car's travel time.",
    metric: "Recall 0.27 → 0.67",
    icon: "flow",
    themes: ["ml"],
    github: "https://github.com/sinem-kircali/transport-mode-choice-random-forest",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // NLP & LLMs
  // ---------------------------------------------------------------------------------------
  {
    id: "yelp-review-nlp",
    context: "Erasmus MSc · FEM11154 Large Language Models for Marketing",
    title: "Yelp Review NLP: Embeddings, Sentiment & Star Prediction",
    summary: "Word2Vec embeddings, BERTopic, and VADER sentiment feeding OLS star-rating models.",
    problem:
      "Predict Yelp star ratings from review text alone, using a full NLP feature pipeline rather than a single off-the-shelf model — a graded assignment for the Large Language Models for Marketing course.",
    approach:
      "Trained custom Word2Vec embeddings on a stratified sample of 6,000 reviews (1,200 per star level), extracted latent topics with BERTopic, scored sentiment with VADER, and combined all three feature sets in OLS regression models predicting star rating.",
    tools: ["Python", "Word2Vec", "BERTopic", "VADER"],
    outcome:
      "Built an interpretable, multi-signal pipeline linking embedding-derived semantic features, topic presence, and sentiment scores directly to star ratings.",
    metric: "6,000 reviews",
    icon: "cluster",
    themes: ["nlp"],
    github: "https://github.com/sinem-kircali/yelp-review-nlp-star-rating-prediction",
    caseStudyUrl: null,
  },
  {
    id: "hotel-review-sentiment",
    context: "Erasmus MSc · FEM11154 Large Language Models for Marketing",
    title: "Hotel Review Topic & Sentiment Analysis",
    summary: "BERTopic topics plus sentence-level sentiment, benchmarking six hotel brands on what guests praise and criticize.",
    problem:
      "Which aspects of a hotel stay (room quality, staff, food, location) drive guest satisfaction, and how do six major hotel brands compare on each? Built for the Large Language Models for Marketing course.",
    approach:
      "Assigned a topic to each review sentence with a pre-trained BERTopic model on pre-computed sentence embeddings, combined the topics with sentence-level sentiment, and used a logistic regression on topic presence and topic-level sentiment to predict whether a reviewer is happy. Then compared Hilton, Marriott, Sheraton, Hyatt, Holiday Inn and Novotel with sentiment heatmaps (raw and topic-demeaned), radar charts and a PCA-based perceptual map.",
    tools: ["Python", "BERTopic", "sentence-transformers", "Logistic Regression"],
    outcome:
      "Produced brand-by-topic sentiment heatmaps and a PCA-based perceptual map that positions the six brands by what guests actually praise or criticize.",
    metric: "6 brands benchmarked",
    icon: "network",
    themes: ["nlp", "marketing"],
    github: "https://github.com/sinem-kircali/hotel-review-topic-sentiment-analysis",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // Marketing analytics & pricing
  // ---------------------------------------------------------------------------------------
  {
    id: "marketing-mix-modeling",
    context: "Erasmus MSc · FEM11150 Strategic Marketing Decision Making",
    title: "Marketing Mix Modeling: Media ROI & Budget Optimization",
    summary: "Quantifies sales contribution and ROI across TikTok, Facebook, and Google Ads.",
    problem:
      "A company needed to understand how much each of three digital media channels contributed to sales, and how to reallocate budget for better return — built for the Strategic Marketing Decision Making course.",
    approach:
      "Built baseline, lagged-effects, and log-log (diminishing-returns) regression models in R on weekly data, plus channel-interaction models, to estimate Sales Return on Marketing Investment (SROMI) per channel and derive optimal vs. actual budget allocation.",
    tools: ["R", "Regression", "Marketing Analytics"],
    outcome:
      "Produced per-channel sales contribution and SROMI estimates, plus an optimal budget allocation derived from log-log elasticities, benchmarked against actual spend.",
    metric: "3 media channels",
    icon: "bars",
    themes: ["marketing"],
    github: "https://github.com/sinem-kircali/marketing-mix-modeling",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // Operations research, simulation & forecasting
  // ---------------------------------------------------------------------------------------
  {
    id: "workforce-optimization",
    context: "Koç BSc · INDR 372 Production Planning and Control",
    title: "Workforce Planning Optimization",
    summary: "Integer linear program minimizing hiring, firing, and inventory-holding costs under seasonal demand.",
    problem:
      "A skateboard manufacturer faces seasonal demand (30, 90, 60 and 100 units over four active months), starts with 2 workers and must end with zero inventory. Each month: how many workers to hire or fire, and how much to produce and hold in stock?",
    approach:
      "Formulated an integer linear program in Gurobi (Python) with workforce-balance and inventory-balance constraints and a capacity of 10 units per worker per month, minimizing the combined cost of firing, hiring, and holding inventory over a 5-month horizon.",
    tools: ["Python", "Gurobi", "Integer Programming"],
    outcome:
      "Produced an optimal month-by-month hiring/firing and production schedule satisfying seasonal demand at minimum total cost.",
    metric: "5-month horizon",
    icon: "flow",
    themes: ["ops"],
    github: "https://github.com/sinem-kircali/workforce-optimization-gurobi",
    caseStudyUrl: null,
  },
  {
    id: "stochastic-simulation",
    context: "Koç BSc · INDR 344 Modeling and Simulation",
    title: "Stochastic Simulation from Scratch",
    summary: "Random-variate generation, input modeling and discrete-event simulation — each part validated against a known answer.",
    problem:
      "Build the main blocks of a simulation study — random-variate generators, input modeling, and event-driven models — and check each one against a known answer rather than trusting the output.",
    approach:
      "Inverse-transform generators validated with KS and chi-square tests; input modeling with Q-Q plots and chi-square normality tests; a dump-truck system written twice (hand-built event scheduling vs. SimPy process interaction) to cross-check utilization; and a four-station job shop run with a warm-up period and 20 replications to get confidence intervals. Combined four homework notebooks and fixed several bugs along the way.",
    tools: ["Python", "SimPy", "NumPy / SciPy", "Monte Carlo"],
    outcome:
      "The two dump-truck implementations agree on long-run utilization (scale 0.859 in both, loaders 0.309 in both). In the job shop, station 3 is the most loaded at 73.4% [70.9, 76.0], and response times sit only 1–2 hours above pure processing time.",
    metric: "20 replications · 95% CIs",
    icon: "scatter",
    themes: ["ops"],
    github: "https://github.com/sinem-kircali/stochastic-simulation-python",
    caseStudyUrl: null,
  },
  {
    id: "discrete-event-simulation",
    context: "Koç BSc · INDR 344 Modeling and Simulation",
    title: "Discrete-Event Simulation: Travel Agency Queuing",
    summary: "SimPy simulation of a two-employee agency to estimate wait times and utilization.",
    problem:
      "Estimate queue lengths, resource utilization, and customer wait times for a two-employee travel agency with priority queuing and probabilistic re-routing between staff.",
    approach:
      "Built a discrete-event simulation in SimPy with a custom monitored-resource class to log queue-length changes over time, modeling priority service at one employee and probabilistic return visits after the second.",
    tools: ["Python", "SimPy", "Discrete-Event Simulation"],
    outcome:
      "Produced time-averaged queue length and utilization estimates for both employees under the system's actual service-time and routing distributions.",
    metric: "2-resource queue model",
    icon: "flow",
    themes: ["ops"],
    github: "https://github.com/sinem-kircali/discrete-event-simulation-simpy",
    caseStudyUrl: null,
  },
  {
    id: "demand-forecasting",
    context: "Koç BSc · INDR 372 Production Planning and Control",
    title: "Forecasting Daily Call Volume: OLS, Lasso, SARIMA",
    summary: "Three forecasting approaches compared on the same held-out period — Lasso cuts test error by ~37% vs. full OLS.",
    problem:
      "How well do a trend-plus-seasonality regression, a Lasso-regularized version of it, and a seasonal ARIMA model forecast daily call volume (366 days of 2004 with a strong weekly cycle)?",
    approach:
      "Cleaned 39 unusual days, trained on the first 288 days and tested on the last 78. Lasso's penalty was chosen by time-series cross-validation; SARIMA(0,1,1)(0,1,1)₇ was chosen from ACF/PACF and AIC and evaluated with genuine one-step-ahead forecasts. Merged three homework parts and fixed several errors, including a test error scored against the wrong column.",
    tools: ["Python", "statsmodels", "scikit-learn", "SARIMA", "Lasso"],
    outcome:
      "Lasso reaches 9.5% test MAPE vs. 17.5% for the full OLS, which overfits (test error 2.7× its training error). A post-Lasso OLS is nearly as accurate and easy to explain: Mondays about 9,300 calls above midweek, Sundays about 45,000 below.",
    metric: "9.5% test MAPE",
    icon: "waves",
    themes: ["ops", "stats"],
    github: "https://github.com/sinem-kircali/demand-forecasting-ols-lasso-sarima",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // Statistics & econometrics
  // ---------------------------------------------------------------------------------------
  {
    id: "gdp-growth",
    context: "Erasmus MSc · FEM11149 Introduction to Data Science · group project",
    title: "Can GDP Growth Be Predicted?",
    summary: "OLS, LASSO, Ridge and Elastic Net on cross-country indicators — stress-tested over 200 random splits.",
    problem:
      "Which economic, demographic and institutional indicators relate to annual GDP growth across 150 countries — and can they predict growth for countries the model hasn't seen?",
    approach:
      "Stepwise OLS for explanation, then LASSO, Ridge, Elastic Net and logistic Ridge for prediction (31 predictors after removing redundant ones), with influence diagnostics, an outlier refit, and every predictive result repeated over 200 random train/test splits.",
    tools: ["R", "glmnet", "LASSO / Ridge / Elastic Net", "R Markdown"],
    outcome:
      "Clear associations but almost no predictive power: the Elastic Net beats a mean-only baseline in only 46% of splits. One outlier — Yemen — shrinks the export effect from about +1.4 to +0.9 percentage points per doubling.",
    metric: "Beats the mean in 46% of splits",
    icon: "scatter",
    themes: ["stats"],
    github: "https://github.com/sinem-kircali/gdp-growth-penalized-regression",
    caseStudyUrl: null,
  },
  {
    id: "life-expectancy",
    context: "Erasmus MSc · FEM11149 Introduction to Data Science · final individual assignment",
    title: "What Drives Life Expectancy?",
    summary: "Stepwise OLS vs. PCA regression vs. Elastic Net on 29 World Bank indicators for 160 countries.",
    problem:
      "Explain and predict life expectancy at birth from health, economic and demographic indicators — and predict it for three countries where it is missing.",
    approach:
      "Split train/test before imputation and scaling, then compared an interpretable stepwise OLS (VIF and residual checks), principal component regression (components chosen by the Kaiser rule, a 70% variance threshold and a permutation test) and a repeated-CV Elastic Net, with bootstrap intervals on the differences between models.",
    tools: ["R", "glmnet", "PCA / PCR", "boot", "R Markdown"],
    outcome:
      "Elastic Net is the most accurate (test RMSE 3.33 years, R² 0.78), but on 32 test countries a bootstrap interval for its edge over OLS includes zero. Life expectancy rises with health spending, sanitation and HepB3 immunization, and falls with fertility, tuberculosis mortality and hypertension.",
    metric: "Test RMSE 3.33 years",
    icon: "trend",
    themes: ["stats"],
    github: "https://github.com/sinem-kircali/life-expectancy-regression-pca",
    caseStudyUrl: null,
  },
  {
    id: "pca-temperature",
    context: "Erasmus MSc · FEM11149 Introduction to Data Science · group assignment",
    title: "Next-Day Temperature Prediction with PCA",
    summary: "Principal Component Regression outperforming OLS on correlated weather features.",
    problem:
      "Predict next-day maximum temperature from correlated weather features, where standard OLS regression risks instability from multicollinearity.",
    approach:
      "Used PCA with Kaiser's-rule and permutation-test diagnostics to select components, fit Principal Component Regression, and benchmarked it against full OLS with a chronological 80/20 split and sensitivity analysis across component counts.",
    tools: ["R", "PCA", "Regression"],
    outcome:
      "PCR with 3 components outperformed full OLS on held-out RMSE, demonstrating the practical value of dimensionality reduction on correlated weather predictors.",
    metric: "3 components, PCR",
    icon: "scatter",
    themes: ["stats"],
    github: "https://github.com/sinem-kircali/pca-temperature-prediction",
    caseStudyUrl: null,
  },
  {
    id: "covid-cfr",
    context: "Koç BSc · INDR 252 Applied Statistics",
    title: "COVID-19 CFR in Germany: Daily vs. Cumulative",
    summary: "How much does the measured case fatality rate depend on how it is measured? Two waves, two measures.",
    problem:
      "How lethal was COVID-19 in Germany in the first and second waves, and how much does the answer depend on how the case fatality rate (CFR) is measured — daily or cumulative?",
    approach:
      "Matched deaths to cases reported 15 days earlier, cleaned data artefacts, then built confidence intervals (z, chi-square and bootstrap), checked autocorrelation and effective sample size, and compared the waves with Welch and Mann–Whitney tests and a case-weighted CFR.",
    tools: ["Python", "SciPy", "statsmodels", "Bootstrap"],
    outcome:
      "Lethality fell in wave 2 (median daily CFR 3.84% → 2.29%, Mann–Whitney p = 0.005) — something a comparison of means misses (Welch p = 0.55) because a 7-day reporting cycle inflates the wave-2 mean. The cumulative CFR is so autocorrelated that its effective sample size is only about 2–9 days.",
    metric: "Mann–Whitney p = 0.005",
    icon: "trend",
    themes: ["stats"],
    github: "https://github.com/sinem-kircali/covid-cfr-statistical-analysis",
    caseStudyUrl: null,
  },
  {
    id: "applied-statistics-cases",
    context: "Koç BSc · INDR 252 Applied Statistics · group case exams",
    title: "Applied Statistics Case Studies",
    summary: "Process control and service-time diagnosis: confidence intervals, exact tests, process capability and a two-way ANOVA.",
    problem:
      "Case A: is a canned cat-food filling process under control, and do the two shifts differ? Case B: after a new evening cook and a new courier started, deliveries ran late — who is responsible?",
    approach:
      "Checked every test's assumptions (run-order plots, autocorrelation, runs tests, Q-Q plots), then used Welch and Agresti–Coull/Caffo intervals, exact binomial and Fisher tests, Levene's test, process capability (Cp, Cpk) and a two-way ANOVA with interaction.",
    tools: ["Python", "SciPy", "statsmodels", "ANOVA"],
    outcome:
      "The filler drifts: shift 1's fill weight climbs by 0.18 oz across the shift (Cpk 0.26 vs. 0.53 for shift 2). In the delivery case the delays trace back to the new evening cook, not the courier: all 9 late deliveries were the new cook's orders (ANOVA F = 41, p < 0.001).",
    metric: "9 of 9 late orders: one cook",
    icon: "bars",
    themes: ["stats"],
    github: "https://github.com/sinem-kircali/statistical-hypothesis-testing-anova",
    caseStudyUrl: null,
  },

  // ---------------------------------------------------------------------------------------
  // Data engineering
  // ---------------------------------------------------------------------------------------
  {
    id: "football-sql-database",
    context: "Koç BSc · INDR 481 Information Systems",
    title: "European Football Relational Database",
    summary: "7-table relational schema modeling European football leagues, teams, and player contracts.",
    problem:
      "Design a relational database from scratch to model European football data — countries, leagues, seasons, teams, players, and their season-by-season relationships — for the Information Systems course (database design and SQL).",
    approach:
      "Designed a 7-table MySQL schema (Countries, Leagues, Seasons, Teams, Players, Team_Leagues, Player_Teams) with proper primary/foreign key relationships, then wrote analytical SQL queries spanning multi-table joins, historical champions, and career earnings.",
    tools: ["SQL", "MySQL", "Relational Database Design"],
    outcome:
      "A fully normalized 7-table schema supporting analytical queries such as all-time league champions per country, total career earnings per player, and teams that have never won a given league.",
    metric: "7-table schema",
    icon: "grid",
    themes: ["data"],
    github: "https://github.com/sinem-kircali/sql-relational-database-design",
    caseStudyUrl: null,
  },

  // Add new project entries below this line, following the same shape.
  // Example:
  // {
  //   id: "short-slug",
  //   context: "Koç BSc · INDR 000 Course Name",
  //   title: "New Project Title",
  //   summary: "One-line summary.",
  //   problem: "...",
  //   approach: "...",
  //   tools: ["Tool A", "Tool B"],
  //   outcome: "...",
  //   metric: "Headline stat",
  //   icon: "trend",
  //   themes: ["ml"],
  //   featured: false,
  //   github: "https://github.com/your-username/repo",
  //   caseStudyUrl: null,
  // },
];

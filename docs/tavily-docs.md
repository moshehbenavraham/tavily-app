# SDK Reference

> Integrate Tavily's powerful APIs natively in your Python apps.

## Instantiating a client

To interact with Tavily in Python, you must instatiate a client with your API key. For greater flexibility, we provide both a synchronous and an asynchronous client class.

Once you have instantiated a client, call one of our supported methods (detailed below) to access the API.

### Synchronous Client

```python  theme={null}
from tavily import TavilyClient

client = TavilyClient("tvly-YOUR_API_KEY")
```

### Asynchronous Client

```python  theme={null}
from tavily import AsyncTavilyClient

client = AsyncTavilyClient("tvly-YOUR_API_KEY")
```

### Proxies

If you would like to specify a proxy to be used when making requests, you can do so by passing in a proxy parameter on client instantiation.

Proxy configuration is available in both the synchronous and asynchronous clients.

```python  theme={null}
from tavily import TavilyClient

proxies = {
  "http": "<your HTTP proxy>",
  "https": "<your HTTPS proxy>",
}

client = TavilyClient("tvly-YOUR_API_KEY", proxies=proxies)
```

Alternatively, you can specify which proxies to use by setting the `TAVILY_HTTP_PROXY` and `TAVILY_HTTPS_PROXY` variables in your environment file.

## Tavily Search

<Tip>
  **NEW!** Try our interactive [API
  Playground](https://app.tavily.com/playground) to see each parameter in
  action, and generate ready-to-use Python snippets.
</Tip>

You can access Tavily Search in Python through the client's `search` function.

### Parameters

| Parameter                    | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default     |   |
| :--------------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | - |
| `query` **(required)**       | `str`           | The query to run a search on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | —           |   |
| `auto_parameters`            | `bool`          | When `auto_parameters` is enabled, Tavily automatically configures search parameters based on your query's content and intent. You can still set other parameters manually, and your explicit values will override the automatic ones. The parameters `include_answer`, `include_raw_content`, and `max_results` must always be set manually, as they directly affect response size. Note: `search_depth` may be automatically set to advanced when it's likely to improve results. This uses 2 API credits per request. To avoid the extra cost, you can explicitly set `search_depth` to `basic`. | `"false"`   |   |
| `search_depth`               | `str`           | The depth of the search. It can be `"basic"` or `"advanced"`. `"advanced"` search is tailored to retrieve the most relevant sources and `content` snippets for your query, while `"basic"` search provides generic content snippets from each source.                                                                                                                                                                                                                                                                                                                                               | `"basic"`   |   |
| `topic`                      | `str`           | The category of the search. Determines which agent will be used. Supported values are `"general"`, `"news"` and `"finance"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"general"` |   |
| `time_range`                 | `str`           | The time range back from the current date based on publish date or last updated date. Accepted values include `"day"`, `"week"`, `"month"`, `"year"` or shorthand values `"d"`, `"w"`, `"m"`, `"y"`.                                                                                                                                                                                                                                                                                                                                                                                                | —           |   |
| `start_date`                 | `str`           | Will return all results after the specified start date based on publish date or last updated date. Required to be written in the format YYYY-MM-DD                                                                                                                                                                                                                                                                                                                                                                                                                                                  | —           |   |
| `end_date`                   | `str`           | Will return all results before the specified end date based on publish date or last updated date. Required to be written in the format YYYY-MM-DD.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | —           |   |
| `max_results`                | `int`           | The maximum number of search results to return. It must be between `0` and `20`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `5`         |   |
| `chunks_per_source`          | `int`           | Chunks are short content snippets (maximum 500 characters each) pulled directly from the source. Use `chunks_per_source` to define the maximum number of relevant chunks returned per source and to control the `content` length. Chunks will appear in the `content` field as: `<chunk 1> [...] <chunk 2> [...] <chunk 3>`. Available only when `search_depth` is `"advanced"`.                                                                                                                                                                                                                    | `3`         |   |
| `include_images`             | `bool`          | Include a list of query-related images in the response.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `False`     |   |
| `include_image_descriptions` | `bool`          | Include a list of query-related images and their descriptions in the response.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `False`     |   |
| `include_answer`             | `bool` or `str` | Include an answer to the query generated by an LLM based on search results. A `"basic"` (or `True`) answer is quick but less detailed; an `"advanced"` answer is more detailed.                                                                                                                                                                                                                                                                                                                                                                                                                     | `False`     |   |
| `include_raw_content`        | `bool` or `str` | Include the cleaned and parsed HTML content of each search result. `"markdown"` or `True` returns search result content in markdown format. `"text"` returns the plain text from the results and may increase latency.                                                                                                                                                                                                                                                                                                                                                                              | `False`     |   |
| `include_domains`            | `list[str]`     | A list of domains to specifically include in the search results. Maximum 300 domains.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `[]`        |   |
| `exclude_domains`            | `list[str]`     | A list of domains to specifically exclude from the search results. Maximum 150 domains.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `[]`        |   |
| `country`                    | `str`           | Boost search results from a specific country. This will prioritize content from the selected country in the search results. Available only if topic is `general`.                                                                                                                                                                                                                                                                                                                                                                                                                                   | —           |   |
| `timeout`                    | `float`         | A timeout to be used in requests to the Tavily API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `60`        |   |
| `include_favicon`            | `bool`          | Whether to include the favicon URL for each result.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `False`     |   |
| `include_usage`              | `bool`          | Whether to include credit usage information in the response.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `False`     |   |

### Response format

The response object you receive will be in the following format:

| Key                 | Type                               | Description                                                                                                                                                                             |
| :------------------ | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `results`           | `list[Result]`                     | A list of sorted search results ranked by relevancy.                                                                                                                                    |
| `query`             | `str`                              | Your search query.                                                                                                                                                                      |
| `response_time`     | `float`                            | Your search result response time.                                                                                                                                                       |
| `answer` (optional) | `str`                              | The answer to your search query, generated by an LLM based on Tavily's search results. This is only available if `include_answer` is set to `True`.                                     |
| `images` (optional) | `list[str]` or `list[ImageResult]` | This is only available if `include_images` is set to `True`. A list of query-related image URLs. If `include_image_descriptions` is set to `True`, each entry will be an `ImageResult`. |
| `request_id`        | `str`                              | A unique request identifier you can share with customer support to help resolve issues with specific requests.                                                                          |

### Results

| `Key`                       | `Type`  | Description                                                                                                                                             |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`                     | `str`   | The title of the search result.                                                                                                                         |
| `url`                       | `str`   | The URL of the search result.                                                                                                                           |
| `content`                   | `str`   | The most query-related content from the scraped URL. Tavily uses proprietary AI to extract the most relevant content based on context quality and size. |
| `score`                     | `float` | The relevance score of the search result.                                                                                                               |
| `raw_content` (optional)    | `str`   | The parsed and cleaned HTML content of the site. This is only available if `include_raw_content` is set to `True`.                                      |
| `published_date` (optional) | `str`   | The publication date of the source. This is only available if the search `topic` is set to `"news"`.                                                    |
| `favicon` (optional)        | `str`   | The favicon URL for the search result.                                                                                                                  |

#### Image Results

If `includeImageDescriptions` is set to `true`, each image in the `images` list will be in the following `ImageResult` format:

| Key           | Type     | Description                                |
| :------------ | :------- | :----------------------------------------- |
| `url`         | `string` | The URL of the image.                      |
| `description` | `string` | An LLM-generated description of the image. |

### Example

<AccordionGroup>
  <Accordion title="Request">
    ```python  theme={null}
    from tavily import TavilyClient

    # Step 1. Instantiating your TavilyClient
    tavily_client = TavilyClient(api_key="tvly-YOUR_API_KEY")

    # Step 2. Executing the search request
    response = tavily_client.search("Who is Leo Messi?", include_images=True, include_image_descriptions=True)

    # Step 3. Printing the search results
    print(response)
    ```
  </Accordion>

  <Accordion title="Response">
    ```python  theme={null}
    {
      "query": "Who is Leo Messi?",
      "images": [
        {
          "url": "Image 1 URL",
          "description": "Image 1 Description",
        },
        {
          "url": "Image 2 URL",
          "description": "Image 2 Description",
        },
        {
          "url": "Image 3 URL",
          "description": "Image 3 Description",
        },
        {
          "url": "Image 4 URL",
          "description": "Image 4 Description",
        },
        {
          "url": "Image 5 URL",
          "description": "Image 5 Description",
        }
      ],
      "results": [
        {
          "title": "Source 1 Title",
          "url": "Source 1 URL",
          "content": "Source 1 Content",
          "score": 0.99,
          "favicon": "https://example.com/favicon.ico"
        },
        {
          "title": "Source 2 Title",
          "url": "Source 2 URL",
          "content": "Source 2 Content",
          "score": 0.97,
          "favicon": "https://another.com/favicon.ico"
        }
      ],
      "response_time": 1.09,
      "request_id": "123e4567-e89b-12d3-a456-426614174111"
    }
    ```
  </Accordion>
</AccordionGroup>

## Tavily Extract

You can access Tavily Extract in Python through the client's `extract` function.

### Parameters

| Parameter             | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                            | Default      |   |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- | - |
| `urls` **(required)** | `str` or `list[str]` | The URL (or URLs) you want to extract. If a list is provided, it must not contain more than 20 URLs.                                                                                                                                                                                                                                                                                                   | —            |   |
| `include_images`      | `bool`               | Include a list of images extracted from the URLs in the response.                                                                                                                                                                                                                                                                                                                                      | `False`      |   |
| `extract_depth`       | `str`                | The depth of the extraction process. You may experience higher latency with `"advanced"` extraction, but it offers a higher success rate and retrieves more data from the URL (e.g., tables, embedded content). `"basic"` extraction costs 1 API Credit per 5 successful URL extractions, while `advanced` extraction costs 2 API Credits per 5 successful URL extractions.                            | `"basic"`    |   |
| `format`              | `str`                | The format of the extracted web page content. `"markdown"` returns content in markdown format. `"text"` returns plain text and may increase latency.                                                                                                                                                                                                                                                   | `"markdown"` |   |
| `timeout`             | `float`              | A timeout to be used in requests to the Tavily API.  Maximum time in seconds to wait for the URL extraction before timing out. Must be between 1.0 and 60.0 seconds. If not specified, default timeouts are applied based on extract\_depth: 10 seconds for basic extraction and 30 seconds for advanced extraction.                                                                                   | `None`       |   |
| `include_favicon`     | `bool`               | Whether to include the favicon URL for each result.                                                                                                                                                                                                                                                                                                                                                    | `False`      |   |
| `include_usage`       | `bool`               | Whether to include credit usage information in the response.`NOTE:`The value may be 0 if the total successful URL extractions has not yet reached 5 calls. See our [Credits & Pricing documentation](https://docs.tavily.com/documentation/api-credits) for details.                                                                                                                                   | `False`      |   |
| `query`               | `str`                | User intent for reranking extracted content chunks. When provided, chunks are reranked based on relevance to this query.                                                                                                                                                                                                                                                                               | `None`       |   |
| `chunks_per_source`   | `int`                | Chunks are short content snippets (maximum 500 characters each) pulled directly from the source. Use `chunks_per_source` to define the maximum number of relevant chunks returned per source and to control the `raw_content` length. Chunks will appear in the `raw_content` field as: `<chunk 1> [...] <chunk 2> [...] <chunk 3>`. Available only when `query` is provided. Must be between 1 and 5. | `3`          |   |

### Response format

The response object you receive will be in the following format:

| Key              | Type                     | Description                                                                                                    |
| :--------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------- |
| `results`        | `list[SuccessfulResult]` | A list of extracted content.                                                                                   |
| `failed_results` | `list[FailedResult]`     | A list of URLs that could not be processed.                                                                    |
| `response_time`  | `float`                  | The search result response time.                                                                               |
| `request_id`     | `str`                    | A unique request identifier you can share with customer support to help resolve issues with specific requests. |

#### Successful Results

Each successful result in the `results` list will be in the following `SuccessfulResult` format:

| Key                  | Type        | Description                                                                                                      |
| :------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| `url`                | `str`       | The URL of the webpage.                                                                                          |
| `raw_content`        | `str`       | The raw content extracted. When `query` is provided, contains the top-ranked chunks joined by `[...]` separator. |
| `images` (optional)  | `list[str]` | This is only available if `include_images` is set to `True`. A list of extracted image URLs.                     |
| `favicon` (optional) | `str`       | The favicon URL for the search result.                                                                           |

#### Failed Results

Each failed result in the `results` list will be in the following `FailedResult` format:

| Key     | Type  | Description                                                |
| :------ | :---- | :--------------------------------------------------------- |
| `url`   | `str` | The URL that failed.                                       |
| `error` | `str` | An error message describing why it could not be processed. |

### Example

<AccordionGroup>
  <Accordion title="Request">
    ```python  theme={null}
    from tavily import TavilyClient

    # Step 1. Instantiating your TavilyClient
    tavily_client = TavilyClient(api_key="tvly-YOUR_API_KEY")

    # Step 2. Defining the list of URLs to extract content from
    urls = [
        "https://en.wikipedia.org/wiki/Artificial_intelligence",
        "https://en.wikipedia.org/wiki/Machine_learning",
        "https://en.wikipedia.org/wiki/Data_science",
    ]

    # Step 3. Executing the extract request
    response = tavily_client.extract(urls=urls, include_images=True)

    # Step 4. Printing the extracted raw content
    print(response)
    ```
  </Accordion>

  <Accordion title="Response">
    ```python  theme={null}
    {
        "results": [
            {
                "url": "https://en.wikipedia.org/wiki/Artificial_intelligence",
                "raw_content": "URL 1 raw content",
                "images": [
                    "Image 1 URL",
                    "Image 2 URL"
                ],
                "favicon": "https://en.wikipedia.org/favicon.ico"
            },
            {
                "url": "https://en.wikipedia.org/wiki/Machine_learning",
                "raw_content": "URL 2 raw content",
                "images": [
                    "Image 3 URL",
                    "Image 4 URL"
                ],
                "favicon": "https://en.wikipedia.org/favicon.ico"
            }
        ],
        "failed_results": [],
        "response_time": 1.23,
        "request_id": "123e4567-e89b-12d3-a456-426614174111"
    }
    ```
  </Accordion>
</AccordionGroup>

## Tavily Crawl

<Tip>
  Our agent-first crawl endpoint is currently in **open beta**. Please repost any issues you encounter on our [community page](https://community.tavily.com).
</Tip>

You can access Tavily Crawl in Python through the `crawl` function.

### Parameters

| Parameter            | Type        | Description                                                                                                                                                                                                                                                                                                                                                   | Default      |
| :------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------- |
| `url` **(required)** | `str`       | The root URL to begin the crawl.                                                                                                                                                                                                                                                                                                                              | —            |
| `max_depth`          | `int`       | Max depth of the crawl. Defines how far from the base URL the crawler can explore.                                                                                                                                                                                                                                                                            | `1`          |
| `max_breadth`        | `int`       | Max number of links to follow **per level** of the tree (i.e., per page).                                                                                                                                                                                                                                                                                     | `20`         |
| `limit`              | `int`       | Total number of links the crawler will process before stopping.                                                                                                                                                                                                                                                                                               | `50`         |
| `instructions`       | `str`       | Natural language instructions for the crawler.                                                                                                                                                                                                                                                                                                                | —            |
| `select_paths`       | `list[str]` | **Regex patterns** to select only URLs with specific path patterns (e.g., `"/docs/.*"`, `"/api/v1.*"`).                                                                                                                                                                                                                                                       | `None`       |
| `select_domains`     | `list[str]` | **Regex patterns** to select crawling to specific domains or subdomains (e.g., `"^docs\.example\.com$"`).                                                                                                                                                                                                                                                     | `None`       |
| `exclude_paths`      | `list[str]` | **Regex patterns** to exclude URLs with specific path patterns (e.g., `"/private/.*"`, `"/admin/.*"`).                                                                                                                                                                                                                                                        | `None`       |
| `exclude_domains`    | `list[str]` | **Regex patterns** to exclude specific domains or subdomains from crawling (e.g., `"^private\.example\.com$"`).                                                                                                                                                                                                                                               | `None`       |
| `allow_external`     | `bool`      | Whether to allow following links that go to external domains.                                                                                                                                                                                                                                                                                                 | `True`       |
| `include_images`     | `bool`      | Whether to extract image URLs from the crawled pages.                                                                                                                                                                                                                                                                                                         | `False`      |
| `extract_depth`      | `str`       | Advanced extraction retrieves more data, including tables and embedded content, with higher success but may increase latency. Options: `"basic"` or `"advanced"`.                                                                                                                                                                                             | `"basic"`    |
| `format`             | `str`       | The format of the extracted web page content. `markdown` returns content in markdown format. `text` returns plain text and may increase latency.                                                                                                                                                                                                              | `"markdown"` |
| `include_favicon`    | `bool`      | Whether to include the favicon URL for each result.                                                                                                                                                                                                                                                                                                           | `False`      |
| `timeout`            | `float`     | Maximum time in seconds to wait for the crawl operation before timing out. Must be between 10 and 150 seconds.                                                                                                                                                                                                                                                | `150`        |
| `include_usage`      | `bool`      | Whether to include credit usage information in the response.`NOTE:`The value may be 0 if the total use of /extract and /map have not yet reached minimum requirements. See our [Credits & Pricing documentation](https://docs.tavily.com/documentation/api-credits) for details.                                                                              | `False`      |
| `chunks_per_source`  | `int`       | Chunks are short content snippets (maximum 500 characters each) pulled directly from the source. Use `chunks_per_source` to define the maximum number of relevant chunks returned per source and to control the `raw_content` length. Chunks will appear in the `raw_content` field as: `<chunk 1> [...] <chunk 2> [...] <chunk 3>`. Must be between 1 and 5. | `3`          |

### Response format

The response object you receive will be in the following format:

| Key             | Type           | Description                                                                                                    |
| :-------------- | :------------- | :------------------------------------------------------------------------------------------------------------- |
| `base_url`      | `str`          | The URL you started the crawl from.                                                                            |
| `results`       | `list[Result]` | A list of crawled pages.                                                                                       |
| `response_time` | `float`        | The crawl response time.                                                                                       |
| `request_id`    | `str`          | A unique request identifier you can share with customer support to help resolve issues with specific requests. |

#### Results

Each successful result in the `results` list will be in the following `Result` format:

| Key                  | Type        | Description                            |
| :------------------- | :---------- | :------------------------------------- |
| `url`                | `str`       | The URL of the webpage.                |
| `raw_content`        | `str`       | The raw content extracted.             |
| `images`             | `list[str]` | Image URLs extracted from the page.    |
| `favicon` (optional) | `str`       | The favicon URL for the search result. |

### Example

<AccordionGroup>
  <Accordion title="Request">
    ```python  theme={null}
    from tavily import TavilyClient

    # Step 1. Instantiating your TavilyClient
    tavily_client = TavilyClient(api_key="tvly-YOUR_API_KEY")

    # Step 2. Defining the starting URL of the crawl
    url = "https://docs.tavily.com"

    # Step 3. Executing the crawl with some guidance parameters
    response = tavily_client.crawl(url, instructions="Find information on the Python SDK")

    # Step 4. Printing the crawled results
    print(response)
    ```
  </Accordion>

  <Accordion title="Response">
    ````python  theme={null}
    {
        "base_url": "https://docs.tavily.com",
        "results": [
            {
                "url": "https://docs.tavily.com/sdk/python/quick-start",
                "raw_content": "Quickstart - Tavily Docs\n\n[Tavily Docs home page![light logo](https://mintlify.s3.us-west-1.amazonaws.com/tavilyai/logo/light.svg)![dark logo](https://mintlify.s3.us-west-1.amazonaws.com/tavilyai/logo/dark.svg)](https://tavily.com/)\n\nSearch or ask...\n\nCtrl K\n\n- [Support](mailto:support@tavily.com)\n- [Get an API key](https://app.tavily.com)\n- [Get an API key](https://app.tavily.com)\n\nSearch...\n\nNavigation\n\nPython\n\nQuickstart\n\n[Home](/welcome)[Documentation](/documentation/about)[SDKs](/sdk/python/quick-start)[Examples](/examples/use-cases/data-enrichment)[FAQ](/faq/faq)\n\n- [API Playground](https://app.tavily.com/playground)\n- [Community](https://community.tavily.com)\n- [Blog](https://blog.tavily.com)\n\n##### Python\n\n- [Quickstart](/sdk/python/quick-start)\n- [SDK Reference](/sdk/python/reference)\n\n##### JavaScript\n\n- [Quickstart](/sdk/javascript/quick-start)\n- [SDK Reference](/sdk/javascript/reference)\n\nPython\n\n# Quickstart\n\nIntegrate Tavily\u2019s powerful APIs natively in your Python apps.\n\nLooking for the Python SDK Reference? Head to our [Python SDK Reference](/sdk/python/reference) and learn how to use `tavily-python`.\n\n## [\u200b](#introduction) Introduction\n\nThe Python SDK allows for easy interaction with the Tavily API, offering the full range of our search functionality directly from your Python programs. Easily integrate smart search capabilities into your applications, harnessing Tavily\u2019s powerful search features.\n\n[## GitHub\n\n`/tavily-ai/tavily-python`\n\n![GitHub Repo stars](https://img.shields.io/github/stars/tavily-ai/tavily-python?style=social)](https://github.com/tavily-ai/tavily-python)[## PyPI\n\n`tavily-python`\n\n![PyPI downloads](https://img.shields.io/pypi/dm/tavily-python)](https://pypi.org/project/tavily-python)\n\n## [\u200b](#quickstart) Quickstart\n\nGet started with our Python SDK in less than 5 minutes!\n\n[## Get your free API key\n\nYou get 1,000 free API Credits every month. **No credit card required.**](https://app.tavily.com)\n\n### [\u200b](#installation) Installation\n\nYou can install the Tavily Python SDK using the following:\n\nCopy\n\n```\npip install tavily-python\n\n```\n\n### [\u200b](#usage) Usage\n\nWith Tavily\u2019s Python SDK, you can search the web in only 4 lines of code:\n\nCopy\n\n```\nfrom tavily import TavilyClient\n\ntavily_client = TavilyClient(api_key=\"tvly-YOUR_API_KEY\")\nresponse = tavily_client.search(\"Who is Leo Messi?\")\n\nprint(response)\n\n```\n\nYou can also easily extract content from URLs:\n\nCopy\n\n```\nfrom tavily import TavilyClient\n\ntavily_client = TavilyClient(api_key=\"tvly-YOUR_API_KEY\")\nresponse = tavily_client.extract(\"https://en.wikipedia.org/wiki/Lionel_Messi\")\n\nprint(response)\n\n```\n\nTavily also allows you to perform a smart crawl starting at a given URL.\n\nCopy\n\n```\nfrom tavily import TavilyClient\n\ntavily_client = TavilyClient(api_key=\"tvly-YOUR_API_KEY\")\nresponse = tavily_client.crawl(\"https://docs.tavily.com\", query=\"Python SDK\")\n\nprint(response)\n\n```\n\nThese examples are very simple, and you can do so much more with Tavily!\n\n## [\u200b](#features) Features\n\nOur Python SDK supports the full feature range of our [REST API](/api-reference), and more. We offer both a synchronous and an asynchronous client, for increased flexibility.\n\n- The `search` function lets you harness the full power of Tavily Search.\n- The `extract` function allows you to easily retrieve web content with Tavily Extract.\n\nFor more details, head to the [Python SDK Reference](/sdk/python/reference).\n\n[SDK Reference](/sdk/python/reference)\n\n[x](https://x.com/tavilyai)[github](https://github.com/tavily-ai)[linkedin](https://linkedin.com/company/tavily)[website](https://tavily.com)\n\n[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=docs&utm_source=docs.tavily.com)\n\nOn this page\n\n- [Introduction](#introduction)\n- [Quickstart](#quickstart)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Features]\n        }\n    ],\n    'response_time': 9.14\n}\n\n```\n\n## [\u200b](#tavily-map) Tavily Map\n\nTavily Map allows you to obtain a sitemap starting from a base URL.\n\nYou can access Tavily Map in Python through the `map` function.\n\n### [\u200b](#parameters-4) Parameters\n\n| Parameter | Type | Description | Default |\n| --- | --- | --- | --- |\n| `url` **(required)** | `str` | The root URL to begin the mapping. | \u2014 |\n| `max_depth` | `int` | Max depth of the mapping. Defines how far from the base URL the crawler can explore. | `1` |\n| `max_breadth` | `int` | Max number of links to follow **per level** of the tree (i.e., per page). | `20` |\n| `limit` | `int` | Total number of links the crawler will process before stopping. | `50` |\n| `query` | `str` | Natural language instructions for the crawler | \u2014 |\n| `select_paths` | `list[str]` | **Regex patterns** to select only URLs with specific path patterns (e.g., `\"/docs/.*\"`, `\"/api/v1.*\"`). | `None` |\n| `select_domains` | `list[str]` | **Regex patterns** to select crawling to specific domains or subdomains (e.g., `\"^docs\\.example\\.com$\"`). | `None` |\n| `exclude_paths` | `list[str]` | **Regex patterns** to exclude URLs with specific path patterns (e.g., `\"/private/.*\"`, `\"/admin/.*\"`). | `None` |\n| `exclude_domains` | `list[str]` | **Regex patterns** to exclude specific domains or subdomains from crawling (e.g., `\"^private\\.example\\.com$\"`). | `None` |\n| `allow_external` | `bool` | Whether to allow following links that go to external domains. | `False` |\n\n### [\u200b](#response-format-4) Response format\n\nThe response object you receive will be in the following format:\n\n| Key | Type | Description |\n| --- | --- | --- |\n| `base_url` | `str` | The URL you started the mapping from. |\n| `results` | `list[str]` | A list of URLs that were discovered during the mapping. |\n| `response_time` | `float` | The mapping response time. |\n\n### [\u200b](#example-4) Example\n\nRequest\n\nCopy\n\n```\nfrom tavily import TavilyClient\n\n# Step 1. Instantiating your TavilyClient\ntavily_client = TavilyClient(api_key=\"tvly-YOUR_API_KEY\")\n\n# Step 2. Defining the starting URL of the mapping\nurl = \"https://docs.tavily.com\"\n\n# Step 3. Executing the mapping with some guidance parameters\nresponse = tavily_client.mapping(url, query=\"JavaScript\")\n\n# Step 4. Printing the results\nprint(response)\n\n```\n\nResponse\n\nCopy\n\n```\n{\n    'base_url': 'https://docs.tavily.com',\n    'results': [\n      'https://docs.tavily.com/sdk/javascript/quick-start',\n      'https://docs.tavily.com/sdk/javascript/reference',\n    ],\n    'response_time': 8.43\n}\n\n```\n\n## [\u200b](#tavily-hybrid-rag) Tavily Hybrid RAG\n\nTavily Hybrid RAG is an extension of the Tavily Search API built to retrieve relevant data from both the web and an existing database collection. This way, a RAG agent can combine web sources and locally available data to perform its tasks. Additionally, data queried from the web that is not yet in the database can optionally be inserted into it. This will allow similar searches in the future to be answered faster, without the need to query the web again.\n\n### [\u200b](#parameters-5) Parameters\n\nThe TavilyHybridClient class is your gateway to Tavily Hybrid RAG. There are a few important parameters to keep in mind when you are instantiating a Tavily Hybrid Client.\n\n| Parameter | Type | Description | Default |\n| --- | --- | --- | --- |\n| `api_key` | `str` | Your Tavily API Key |  |\n| `db_provider` | `str` | Your database provider. Currently, only `\"mongodb\"` is supported. |  |\n| `collection` | `str` | A reference to the MongoDB collection that will be used for local search. |  |\n| `embeddings_field` (optional) | `str` | The name of the field that stores the embeddings in the specified collection. This field MUST be the same one used in the specified index. This will also be used when inserting web search results in the database using our default function. | `\"embeddings\"` |\n| `content_field` (optional) | `str` | The name of the field that stores the text content in the specified collection. This will also be used when inserting web search results in the database using our default function. | `\"content\"` |\n| `embedding_function` (optional) | `function` | A custom embedding function (if you want to use one). The function must take in a `list[str]` corresponding to the list of strings to be embedded, as well as an additional string defining the type of document. It must return a `list[list[float]]`, one embedding per input string. If no function is provided, defaults to Cohere\u2019s Embed. Keep in mind that you shouldn\u2019t mix different embeddings in the same database collection. |  |\n| `ranking_function` (optional) | `function` | A custom ranking function (if you want to use one). If no function is provided, defaults to Cohere\u2019s Rerank. It should return an ordered `list[dict]` where the documents are sorted by decreasing relevancy to your query. Each returned document will have two properties - `content`, which is a `str`, and `score`, which is a `float`. The function MUST accept the following parameters: `query`: `str` - This is the query you are executing. When your ranking function is called during Hybrid RAG, the query parameter of your search call (more details below) will be passed as query. `documents`:`List[Dict]`: - This is the list of documents that are returned by your Hybrid RAG call and that you want to sort. Each document will have two properties - `content`, which is a `str`, and `score`, which is a `float`. `top_n`: `int` - This is the number of results you want to return after ranking. When your ranking function is called during Hybrid RAG, the max\\_results value will be passed as `top_n`. |  |\n\n### [\u200b](#methods) Methods\n\n`search`(query, max\\_results=10, max\\_local=None, max\\_foreign=None, save\\_foreign=False, \\*\\*kwargs)\n\nPerforms a Tavily Hybrid RAG query and returns the retrieved documents as a `list[dict]` where the documents are sorted by decreasing relevancy to your query. Each returned document will have three properties - `content` (str), `score` (float), and `origin`, which is either `local` or `foreign`.\n\n| Parameter | Type | Description | Default |  |\n| --- | --- | --- | --- | --- |\n| `query` | `str` | The query you want to search for. |  |  |\n| `max_results` | `int` | The maximum number of total search results to return. | 10 |  |\n| `max_local` | `int` | The maximum number of local search results to return. | `None`, which defaults to `max_results`. |  |\n| `max_local` | `int` | The maximum number of local search results to return. | `None`, which defaults to `max_results`. |  |\n| `max_foreign` | `int` | The maximum number of web search results to return. | `None`, which defaults to `max_results`. |  |\n| `save_foreign` | `Union[bool, function]` | Save documents from the web search in the local database. If `True` is passed, our default saving function (which only saves the content `str` and the embedding `list[float]` will be used.) If `False` is passed, no web search result documents will be saved in the local database. If a function is passed, that function MUST take in a `dict` as a parameter, and return another `dict`. The input `dict` contains all properties of the returned Tavily result object. The output dict is the final document that will be inserted in the database. You are free to add to it any fields that are supported by the database, as well as remove any of the default ones. If this function returns `None`, the document will not be saved in the database. |  |  |\n\nAdditional parameters can be provided as keyword arguments (detailed below). The keyword arguments supported by this method are: `search_depth`, `topic`, `include_raw_content`, `include_domains`,`exclude_domains`.\n\n### [\u200b](#setup) Setup\n\n#### [\u200b](#mongodb-setup) MongoDB setup\n\nYou will need to have a MongoDB collection with a vector search index. You can follow the [MongoDB Documentation](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-type/) to learn how to set this up.\n\n#### [\u200b](#cohere-api-key) Cohere API Key\n\nBy default, embedding and ranking use the Cohere API, our recommended option. Unless you want to provide a custom embedding and ranking function, you\u2019ll need to get an API key from [Cohere](https://cohere.com/) and set it as an environment variable named `CO_API_KEY`\n\nIf you decide to stick with Cohere, please note that you\u2019ll need to install the Cohere Python package as well:\n\nCopy\n\n```\npip install cohere\n\n```\n\n#### [\u200b](#tavily-hybrid-rag-client-setup) Tavily Hybrid RAG Client setup\n\nOnce you are done setting up your database, you\u2019ll need to create a MongoDB Client as well as a Tavily Hybrid RAG Client.\nA minimal setup would look like this:\n\nCopy\n\n```\nfrom pymongo import MongoClient\nfrom tavily import TavilyHybridClient\n\ndb = MongoClient(\"mongodb+srv://YOUR_MONGO_URI\")[\"YOUR_DB\"]\n\nhybrid_rag = TavilyHybridClient(\n    api_key=\"tvly-YOUR_API_KEY\",\n    db_provider=\"mongodb\",\n    collection=db.get_collection(\"YOUR_COLLECTION\"),\n    index=\"YOUR_VECTOR_SEARCH_INDEX\",\n    embeddings_field=\"YOUR_EMBEDDINGS_FIELD\",\n    content_field=\"YOUR_CONTENT_FIELD\"\n)\n\n```\n\n### [\u200b](#usage) Usage\n\nOnce you create the proper clients, you can easily start searching. A few simple examples are shown below. They assume you\u2019ve followed earlier steps. You can use most of the Tavily Search parameters with Tavily Hybrid RAG as well.\n\n#### [\u200b](#simple-tavily-hybrid-rag-example) Simple Tavily Hybrid RAG example\n\nThis example will look for context about Leo Messi on the web and in the local database.\nHere, we get 5 sources, both from our database and from the web, but we want to exclude unwanted-domain.com from our web search results:\n\nCopy\n\n```\nresults = hybrid_rag.search(\"Who is Leo Messi?\", max_results=5, exclude_domains=['unwanted-domain.com'])\n\n```\n\nHere, we want to prioritize the number of local sources, so we will get 2 foreign (web) sources, and 5 sources from our database:\n\nCopy\n\n```\nresults = hybrid_rag.search(\"Who is Leo Messi?\",  max_local=5, max_foreign=2)\n\n```\n\nNote: The sum of `max_local` and `max_foreign` can exceed `max_results`, but only the top `max_results` results will be returned.\n\n#### [\u200b](#adding-retrieved-data-to-the-database) Adding retrieved data to the database\n\nIf you want to add the retrieved data to the database, you can do so by setting the save\\_foreign parameter to True:\n\nCopy\n\n```\nresults = hybrid_rag.search(\"Who is Leo Messi?\", save_foreign=True)\n\n```\n\nThis will use our default saving function, which stores the content and its embedding.\n\n### [\u200b](#examples) Examples\n\n#### [\u200b](#sample-1%3A-using-a-custom-saving-function) Sample 1: Using a custom saving function\n\nYou might want to add some extra properties to documents you\u2019re inserting or even discard some of them based on custom criteria. This can be done by passing a function to the save\\_foreign parameter:\n\nCopy\n\n```\ndef save_document(document):\n    if document['score'] < 0.5:\n        return None # Do not save documents with low scores\n\n    return {\n        'content': document['content'],\n\n         # Save the title and URL in the database\n        'site_title': document['title'],\n        'site_url': document['url'],\n\n        # Add a new field\n        'added_at': datetime.now()\n    }\n\nresults = hybrid_rag.search(\"Who is Leo Messi?\", save_foreign=save_document)\n\n```\n\n#### [\u200b](#sample-2%3A-using-a-custom-embedding-function) Sample 2: Using a custom embedding function\n\nBy default, we use [Cohere](https://cohere.com/) for our embeddings. If you want to use your own embeddings, can pass a custom embedding function to the TavilyHybridClient:\n\nCopy\n\n```\ndef my_embedding_function(texts, doc_type): # doc_type will be either 'search_query' or 'search_document'\n    return my_embedding_model.encode(texts)\n\nhybrid_rag = TavilyHybridClient(\n    # ...\n    embedding_function=my_embedding_function\n)\n\n```\n\n#### [\u200b](#sample-3%3A-using-a-custom-ranking-function) Sample 3: Using a custom ranking function\n\nCohere\u2019s [rerank](https://cohere.com/rerank) model is used by default, but you can pass your own function to the ranking\\_function parameter:\n\nCopy\n\n```\ndef my_ranking_function(query, documents, top_n):\n    return my_ranking_model.rank(query, documents, top_n)\n\nhybrid_rag = TavilyHybridClient(\n    # ...\n    ranking_function=my_ranking_function\n)\n\n```\n\n[Quickstart](/sdk/python/quick-start)[Quickstart](/sdk/javascript/quick-start)\n\n[x](https://x.com/tavilyai)[github](https://github.com/tavily-ai)[linkedin](https://linkedin.com/company/tavily)[website](https://tavily.com)\n\n[Powered by Mintlify](https://mintlify.com/preview-request?utm_campaign=poweredBy&utm_medium=docs&utm_source=docs.tavily.com)\n\nOn this page\n\n- [Instantiating a client](#instantiating-a-client)\n- [Synchronous Client](#synchronous-client)\n- [Asynchronous Client](#asynchronous-client)\n- [Proxies](#proxies)\n- [Tavily Search](#tavily-search)\n- [Parameters](#parameters)\n- [Response format](#response-format)\n- [Results](#results)\n- [Image Results](#image-results)\n- [Example](#example)\n- [Tavily Extract](#tavily-extract)\n- [Parameters](#parameters-2)\n- [Response format](#response-format-2)\n- [Successful Results](#successful-results)\n- [Failed Results](#failed-results)\n- [Example](#example-2)\n- [Tavily Crawl](#tavily-crawl)\n- [Parameters](#parameters-3)\n- [Response format](#response-format-3)\n- [Results](#results-2)\n- [Example](#example-3)\n- [Tavily Map](#tavily-map)\n- [Parameters](#parameters-4)\n- [Response format](#response-format-4)\n- [Example](#example-4)\n- [Tavily Hybrid RAG](#tavily-hybrid-rag)\n- [Parameters](#parameters-5)\n- [Methods](#methods)\n- [Setup](#setup)\n- [MongoDB setup](#mongodb-setup)\n- [Cohere API Key](#cohere-api-key)\n- [Tavily Hybrid RAG Client setup](#tavily-hybrid-rag-client-setup)\n- [Usage](#usage)\n- [Simple Tavily Hybrid RAG example](#simple-tavily-hybrid-rag-example)\n- [Adding retrieved data to the database](#adding-retrieved-data-to-the-database)\n- [Examples](#examples)\n- [Sample 1: Using a custom saving function](#sample-1%3A-using-a-custom-saving-function)\n- [Sample 2: Using a custom embedding function](#sample-2%3A-using-a-custom-embedding-function)\n- [Sample 3: Using a custom ranking function](#sample-3%3A-using-a-custom-ranking-function)",
                "images": [],
                "favicon": "https://mintlify.s3-us-west-1.amazonaws.com/tavilyai/_generated/favicon/apple-touch-icon.png?v=3"

            }
        ],
        "response_time": 9.07,
        "request_id": "123e4567-e89b-12d3-a456-426614174111"
    }
    ````
  </Accordion>
</AccordionGroup>

## Tavily Map

<Tip>
  Our agent-first mapping endpoint is currently in **open beta**. Please repost any issues you encounter on our [community page](https://community.tavily.com).
</Tip>

Tavily Map allows you to obtain a sitemap starting from a base URL.

You can access Tavily Map in Python through the `map` function.

### Parameters

| Parameter            | Type        | Description                                                                                                                                                                                                                                                        | Default |
| :------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `url` **(required)** | `str`       | The root URL to begin the mapping.                                                                                                                                                                                                                                 | —       |
| `max_depth`          | `int`       | Max depth of the mapping. Defines how far from the base URL the crawler can explore.                                                                                                                                                                               | `1`     |
| `max_breadth`        | `int`       | Max number of links to follow **per level** of the tree (i.e., per page).                                                                                                                                                                                          | `20`    |
| `limit`              | `int`       | Total number of links the crawler will process before stopping.                                                                                                                                                                                                    | `50`    |
| `instructions`       | `str`       | Natural language instructions for the crawler                                                                                                                                                                                                                      | —       |
| `select_paths`       | `list[str]` | **Regex patterns** to select only URLs with specific path patterns (e.g., `"/docs/.*"`, `"/api/v1.*"`).                                                                                                                                                            | `None`  |
| `select_domains`     | `list[str]` | **Regex patterns** to select crawling to specific domains or subdomains (e.g., `"^docs\.example\.com$"`).                                                                                                                                                          | `None`  |
| `exclude_paths`      | `list[str]` | **Regex patterns** to exclude URLs with specific path patterns (e.g., `"/private/.*"`, `"/admin/.*"`).                                                                                                                                                             | `None`  |
| `exclude_domains`    | `list[str]` | **Regex patterns** to exclude specific domains or subdomains from crawling (e.g., `"^private\.example\.com$"`).                                                                                                                                                    | `None`  |
| `allow_external`     | `bool`      | Whether to allow following links that go to external domains.                                                                                                                                                                                                      | `True`  |
| `timeout`            | `float`     | Maximum time in seconds to wait for the map operation before timing out. Must be between 10 and 150 seconds.                                                                                                                                                       | `150`   |
| `include_usage`      | `bool`      | Whether to include credit usage information in the response.`NOTE:`The value may be 0 if the total successful pages mapped has not yet reached 10 calls. See our [Credits & Pricing documentation](https://docs.tavily.com/documentation/api-credits) for details. | `False` |

### Response format

The response object you receive will be in the following format:

| Key             | Type        | Description                                                                                                   |
| :-------------- | :---------- | :------------------------------------------------------------------------------------------------------------ |
| `base_url`      | `str`       | The URL you started the mapping from.                                                                         |
| `results`       | `list[str]` | A list of URLs that were discovered during the mapping.                                                       |
| `response_time` | `float`     | The mapping response time.                                                                                    |
| `request_id`    | `str`       | A unique request identifier you can share with customer support to help resolve issues with specific requests |

### Example

<AccordionGroup>
  <Accordion title="Request">
    ```python  theme={null}
    from tavily import TavilyClient

    # Step 1. Instantiating your TavilyClient
    tavily_client = TavilyClient(api_key="tvly-YOUR_API_KEY")

    # Step 2. Defining the starting URL of the mapping
    url = "https://docs.tavily.com"

    # Step 3. Executing the mapping with some guidance parameters
    response = tavily_client.mapping(url, instructions="Find information on the JavaScript SDK")

    # Step 4. Printing the results
    print(response)
    ```
  </Accordion>

  <Accordion title="Response">
    ```python  theme={null}
    {
        'base_url': 'https://docs.tavily.com',
        'results': [
          'https://docs.tavily.com/sdk/javascript/quick-start',
          'https://docs.tavily.com/sdk/javascript/reference',
        ],
        'response_time': 8.43,
        "request_id": "123e4567-e89b-12d3-a456-426614174111"
    }
    ```
  </Accordion>
</AccordionGroup>

## Tavily Hybrid RAG

Tavily Hybrid RAG is an extension of the Tavily Search API built to retrieve relevant data from both the web and an existing database collection. This way, a RAG agent can combine web sources and locally available data to perform its tasks. Additionally, data queried from the web that is not yet in the database can optionally be inserted into it. This will allow similar searches in the future to be answered faster, without the need to query the web again.

### Parameters

The TavilyHybridClient class is your gateway to Tavily Hybrid RAG. There are a few important parameters to keep in mind when you are instantiating a Tavily Hybrid Client.

| Parameter                       | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default        |
| :------------------------------ | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `api_key`                       | `str`      | Your Tavily API Key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                |
| `db_provider`                   | `str`      | Your database provider. Currently, only `"mongodb"` is supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                |
| `collection`                    | `str`      | A reference to the MongoDB collection that will be used for local search.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                |
| `embeddings_field` (optional)   | `str`      | The name of the field that stores the embeddings in the specified collection. This field MUST be the same one used in the specified index. This will also be used when inserting web search results in the database using our default function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"embeddings"` |
| `content_field` (optional)      | `str`      | The name of the field that stores the text content in the specified collection. This will also be used when inserting web search results in the database using our default function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"content"`    |
| `embedding_function` (optional) | `function` | A custom embedding function (if you want to use one). The function must take in a `list[str]` corresponding to the list of strings to be embedded, as well as an additional string defining the type of document. It must return a `list[list[float]]`, one embedding per input string. If no function is provided, defaults to Cohere's Embed. Keep in mind that you shouldn't mix different embeddings in the same database collection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                |
| `ranking_function` (optional)   | `function` | A custom ranking function (if you want to use one). If no function is provided, defaults to Cohere's Rerank. It should return an ordered `list[dict]` where the documents are sorted by decreasing relevancy to your query. Each returned document will have two properties - `content`, which is a `str`, and `score`, which is a `float`. The function MUST accept the following parameters: `query`: `str` - This is the query you are executing. When your ranking function is called during Hybrid RAG, the query parameter of your search call (more details below) will be passed as query. `documents`:`List[Dict]`: - This is the list of documents that are returned by your Hybrid RAG call and that you want to sort. Each document will have two properties - `content`, which is a `str`, and `score`, which is a `float`. `top_n`: `int` - This is the number of results you want to return after ranking. When your ranking function is called during Hybrid RAG, the max\_results value will be passed as `top_n`. |                |

### Methods

`search`(query, max\_results=10, max\_local=None, max\_foreign=None, save\_foreign=False, \*\*kwargs)

Performs a Tavily Hybrid RAG query and returns the retrieved documents as a `list[dict]` where the documents are sorted by decreasing relevancy to your query. Each returned document will have three properties - `content` (str), `score` (float), and `origin`, which is either `local` or `foreign`.

| Parameter      | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default                                  |   |
| :------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | - |
| `query`        | `str`                   | The query you want to search for.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | —                                        |   |
| `max_results`  | `int`                   | The maximum number of total search results to return.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 10                                       |   |
| `max_local`    | `int`                   | The maximum number of local search results to return.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `None`, which defaults to `max_results`. |   |
| `max_local`    | `int`                   | The maximum number of local search results to return.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `None`, which defaults to `max_results`. |   |
| `max_foreign`  | `int`                   | The maximum number of web search results to return.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `None`, which defaults to `max_results`. |   |
| `save_foreign` | `Union[bool, function]` | Save documents from the web search in the local database. If `True` is passed, our default saving function (which only saves the content `str` and the embedding `list[float]` will be used.) If `False` is passed, no web search result documents will be saved in the local database. If a function is passed, that function MUST take in a `dict` as a parameter, and return another `dict`. The input `dict` contains all properties of the returned Tavily result object. The output dict is the final document that will be inserted in the database. You are free to add to it any fields that are supported by the database, as well as remove any of the default ones. If this function returns `None`, the document will not be saved in the database. | —                                        |   |

Additional parameters can be provided as keyword arguments (detailed below). The keyword arguments supported by this method are: `search_depth`, `topic`, `include_raw_content`, `include_domains`,`exclude_domains`.

### Setup

#### MongoDB setup

You will need to have a MongoDB collection with a vector search index. You can follow the [MongoDB Documentation](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-type/) to learn how to set this up.

#### Cohere API Key

By default, embedding and ranking use the Cohere API, our recommended option. Unless you want to provide a custom embedding and ranking function, you'll need to get an API key from [Cohere](https://cohere.com/) and set it as an environment variable named `CO_API_KEY`

If you decide to stick with Cohere, please note that you'll need to install the Cohere Python package as well:

```bash  theme={null}
pip install cohere
```

#### Tavily Hybrid RAG Client setup

Once you are done setting up your database, you'll need to create a MongoDB Client as well as a Tavily Hybrid RAG Client.
A minimal setup would look like this:

```python  theme={null}
from pymongo import MongoClient
from tavily import TavilyHybridClient

db = MongoClient("mongodb+srv://YOUR_MONGO_URI")["YOUR_DB"]

hybrid_rag = TavilyHybridClient(
    api_key="tvly-YOUR_API_KEY",
    db_provider="mongodb",
    collection=db.get_collection("YOUR_COLLECTION"),
    index="YOUR_VECTOR_SEARCH_INDEX",
    embeddings_field="YOUR_EMBEDDINGS_FIELD",
    content_field="YOUR_CONTENT_FIELD"
)
```

### Usage

Once you create the proper clients, you can easily start searching. A few simple examples are shown below. They assume you've followed earlier steps. You can use most of the Tavily Search parameters with Tavily Hybrid RAG as well.

#### Simple Tavily Hybrid RAG example

This example will look for context about Leo Messi on the web and in the local database.
Here, we get 5 sources, both from our database and from the web, but we want to exclude unwanted-domain.com from our web search results:

```python  theme={null}
results = hybrid_rag.search("Who is Leo Messi?", max_results=5, exclude_domains=['unwanted-domain.com'])
```

Here, we want to prioritize the number of local sources, so we will get 2 foreign (web) sources, and 5 sources from our database:

```python  theme={null}
results = hybrid_rag.search("Who is Leo Messi?",  max_local=5, max_foreign=2)
```

Note: The sum of `max_local` and `max_foreign` can exceed `max_results`, but only the top `max_results` results will be returned.

#### Adding retrieved data to the database

If you want to add the retrieved data to the database, you can do so by setting the save\_foreign parameter to True:

```python  theme={null}
results = hybrid_rag.search("Who is Leo Messi?", save_foreign=True)
```

This will use our default saving function, which stores the content and its embedding.

### Examples

#### Sample 1: Using a custom saving function

You might want to add some extra properties to documents you're inserting or even discard some of them based on custom criteria. This can be done by passing a function to the save\_foreign parameter:

```python  theme={null}
def save_document(document):
    if document['score'] < 0.5:
        return None # Do not save documents with low scores

    return {
        'content': document['content'],

         # Save the title and URL in the database
        'site_title': document['title'],
        'site_url': document['url'],

        # Add a new field
        'added_at': datetime.now()
    }

results = hybrid_rag.search("Who is Leo Messi?", save_foreign=save_document)
```

#### Sample 2: Using a custom embedding function

By default, we use [Cohere](https://cohere.com/) for our embeddings. If you want to use your own embeddings, can pass a custom embedding function to the TavilyHybridClient:

```python  theme={null}
def my_embedding_function(texts, doc_type): # doc_type will be either 'search_query' or 'search_document'
    return my_embedding_model.encode(texts)

hybrid_rag = TavilyHybridClient(
    # ...
    embedding_function=my_embedding_function
)
```


---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://docs.tavily.com/llms.txt

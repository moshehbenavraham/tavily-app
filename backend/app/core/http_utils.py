"""HTTP client utilities for API integrations.

Provides reusable configuration helpers for httpx clients including
timeout settings and header builders for consistent API authentication.
"""

from typing import Any

import httpx


def create_timeout(
    timeout_seconds: int | float,
    connect_timeout: int | float | None = None,
) -> httpx.Timeout:
    """Create an httpx Timeout configuration.

    Args:
        timeout_seconds: Total timeout for the request in seconds.
        connect_timeout: Optional separate timeout for connection establishment.
            If not provided, uses timeout_seconds.

    Returns:
        Configured httpx.Timeout instance.
    """
    return httpx.Timeout(
        timeout=timeout_seconds,
        connect=connect_timeout or timeout_seconds,
    )


def build_bearer_auth_headers(
    api_key: str,
    additional_headers: dict[str, str] | None = None,
) -> dict[str, str]:
    """Build headers with Bearer token authentication.

    Args:
        api_key: The API key to use as Bearer token.
        additional_headers: Optional additional headers to merge.

    Returns:
        Dictionary of headers including Authorization.
    """
    headers: dict[str, Any] = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    if additional_headers:
        headers.update(additional_headers)
    return headers


def build_api_key_headers(
    api_key: str,
    header_name: str = "X-API-Key",
    additional_headers: dict[str, str] | None = None,
) -> dict[str, str]:
    """Build headers with API key authentication.

    Args:
        api_key: The API key value.
        header_name: The header name for the API key (default: X-API-Key).
        additional_headers: Optional additional headers to merge.

    Returns:
        Dictionary of headers including the API key.
    """
    headers: dict[str, Any] = {
        header_name: api_key,
        "Content-Type": "application/json",
    }
    if additional_headers:
        headers.update(additional_headers)
    return headers

"""Custom exceptions for Google Gemini Deep Research API integration.

This module defines custom exception classes and error codes for handling
Gemini API errors in a structured way. The GeminiAPIError exception provides
consistent error responses with HTTP status code mapping.

Unlike Perplexity's synchronous model, Gemini uses async polling which
introduces additional error scenarios around job management and polling.

Usage:
    from app.exceptions.gemini import GeminiAPIError, GeminiErrorCode

    # Raise with factory method
    raise GeminiAPIError.rate_limit_exceeded()

    # Raise with custom parameters
    raise GeminiAPIError(
        status_code=500,
        error_code=GeminiErrorCode.GEMINI_API_ERROR,
        message="An unexpected error occurred",
    )
"""

from enum import StrEnum
from typing import Any


class GeminiErrorCode(StrEnum):
    """Error codes for Gemini API errors.

    These codes provide machine-readable error categorization for clients
    to handle different error types appropriately. Includes codes specific
    to async polling workflow.

    Attributes:
        RATE_LIMIT_EXCEEDED: API rate limit has been exceeded.
        INVALID_API_KEY: API key is invalid or missing.
        REQUEST_TIMEOUT: Request timed out waiting for response.
        INVALID_REQUEST: Request parameters are invalid.
        RESEARCH_FAILED: Deep research job failed during execution.
        INTERACTION_NOT_FOUND: Requested interaction ID does not exist.
        MAX_POLLS_EXCEEDED: Maximum polling attempts reached.
        POLLING_TIMEOUT: Total polling duration exceeded limit.
        GEMINI_API_ERROR: Unexpected error from Gemini API.
    """

    RATE_LIMIT_EXCEEDED = "rate_limit_exceeded"
    INVALID_API_KEY = "invalid_api_key"
    REQUEST_TIMEOUT = "request_timeout"
    INVALID_REQUEST = "invalid_request"
    RESEARCH_FAILED = "research_failed"
    INTERACTION_NOT_FOUND = "interaction_not_found"
    MAX_POLLS_EXCEEDED = "max_polls_exceeded"
    POLLING_TIMEOUT = "polling_timeout"
    GEMINI_API_ERROR = "gemini_api_error"


class GeminiAPIError(Exception):
    """Custom exception for Gemini API errors.

    This exception provides structured error information including HTTP status
    code, error code, message, and optional details. It is designed to be
    caught by a FastAPI exception handler for consistent API error responses.

    Attributes:
        status_code: HTTP status code for the error response.
        error_code: Machine-readable error code from GeminiErrorCode.
        message: Human-readable error message.
        details: Optional additional error details.
    """

    def __init__(
        self,
        status_code: int,
        error_code: GeminiErrorCode,
        message: str,
        details: dict[str, Any] | None = None,
    ) -> None:
        """Initialize GeminiAPIError.

        Args:
            status_code: HTTP status code for the error response.
            error_code: Machine-readable error code from GeminiErrorCode.
            message: Human-readable error message.
            details: Optional additional error details.
        """
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message
        self.details = details

    # =========================================================================
    # Common Error Factory Methods
    # =========================================================================

    @classmethod
    def rate_limit_exceeded(
        cls,
        message: str = "Gemini API rate limit exceeded. Please try again later.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a rate limit exceeded error.

        Args:
            message: Custom error message. Defaults to standard rate limit message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for rate limit exceeded (429).
        """
        return cls(
            status_code=429,
            error_code=GeminiErrorCode.RATE_LIMIT_EXCEEDED,
            message=message,
            details=details,
        )

    @classmethod
    def invalid_api_key(
        cls,
        message: str = "Invalid or missing Gemini API key.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create an invalid API key error.

        Args:
            message: Custom error message. Defaults to standard auth message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for invalid API key (401).
        """
        return cls(
            status_code=401,
            error_code=GeminiErrorCode.INVALID_API_KEY,
            message=message,
            details=details,
        )

    @classmethod
    def request_timeout(
        cls,
        message: str = "Gemini API request timed out.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a request timeout error.

        Args:
            message: Custom error message. Defaults to standard timeout message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for request timeout (504).
        """
        return cls(
            status_code=504,
            error_code=GeminiErrorCode.REQUEST_TIMEOUT,
            message=message,
            details=details,
        )

    @classmethod
    def invalid_request(
        cls,
        message: str = "Invalid request parameters for Gemini API.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create an invalid request error.

        Args:
            message: Custom error message. Defaults to standard validation message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for invalid request (400).
        """
        return cls(
            status_code=400,
            error_code=GeminiErrorCode.INVALID_REQUEST,
            message=message,
            details=details,
        )

    # =========================================================================
    # Gemini-Specific Error Factory Methods
    # =========================================================================

    @classmethod
    def research_failed(
        cls,
        message: str = "Gemini deep research job failed during execution.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a research failed error.

        Used when a deep research job fails during processing on the Gemini side.

        Args:
            message: Custom error message. Defaults to standard failure message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for research failure (500).
        """
        return cls(
            status_code=500,
            error_code=GeminiErrorCode.RESEARCH_FAILED,
            message=message,
            details=details,
        )

    @classmethod
    def interaction_not_found(
        cls,
        message: str = "Gemini interaction not found. The interaction ID may be invalid or expired.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create an interaction not found error.

        Used when polling with an interaction ID that does not exist.

        Args:
            message: Custom error message. Defaults to standard not found message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for interaction not found (404).
        """
        return cls(
            status_code=404,
            error_code=GeminiErrorCode.INTERACTION_NOT_FOUND,
            message=message,
            details=details,
        )

    @classmethod
    def max_polls_exceeded(
        cls,
        message: str = "Maximum polling attempts exceeded for Gemini deep research.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a max polls exceeded error.

        Used when the client has exceeded the maximum number of polling attempts.

        Args:
            message: Custom error message. Defaults to standard max polls message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for max polls exceeded (408).
        """
        return cls(
            status_code=408,
            error_code=GeminiErrorCode.MAX_POLLS_EXCEEDED,
            message=message,
            details=details,
        )

    @classmethod
    def polling_timeout(
        cls,
        message: str = "Gemini deep research polling timed out.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a polling timeout error.

        Used when total polling duration exceeds the configured limit.

        Args:
            message: Custom error message. Defaults to standard polling timeout message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for polling timeout (504).
        """
        return cls(
            status_code=504,
            error_code=GeminiErrorCode.POLLING_TIMEOUT,
            message=message,
            details=details,
        )

    @classmethod
    def api_error(
        cls,
        message: str = "An error occurred while communicating with the Gemini API.",
        details: dict[str, Any] | None = None,
    ) -> "GeminiAPIError":
        """Create a generic Gemini API error.

        Args:
            message: Custom error message. Defaults to standard API error message.
            details: Optional additional error details.

        Returns:
            GeminiAPIError configured for generic API error (500).
        """
        return cls(
            status_code=500,
            error_code=GeminiErrorCode.GEMINI_API_ERROR,
            message=message,
            details=details,
        )

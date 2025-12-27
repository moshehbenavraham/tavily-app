"""Gemini Deep Research API route handlers.

This module provides FastAPI route handlers for Google Gemini deep research
operations. Unlike Perplexity's synchronous model, Gemini uses an async
polling workflow where clients submit a job, receive an interaction ID,
and then poll for status updates until completion.

Routes require JWT authentication via CurrentUser dependency and use
GeminiDep for service injection.

Endpoints:
    POST /gemini/deep-research/sync - Execute deep research and wait for completion
    POST /gemini/deep-research - Start async deep research job
    GET /gemini/deep-research/{interaction_id} - Poll for job status
    DELETE /gemini/deep-research/{interaction_id} - Cancel running job
"""

from typing import Any

from fastapi import APIRouter, Query

from app.api.deps import CurrentUser, GeminiDep
from app.schemas.gemini import (
    GeminiDeepResearchJobResponse,
    GeminiDeepResearchRequest,
    GeminiDeepResearchResultResponse,
)

router = APIRouter(prefix="/gemini", tags=["gemini"])


@router.post("/deep-research/sync", response_model=GeminiDeepResearchResultResponse)
async def deep_research_sync(
    _current_user: CurrentUser,
    gemini: GeminiDep,
    request: GeminiDeepResearchRequest,
) -> Any:
    """Execute a deep research query and wait for completion.

    Starts a deep research job and blocks until the job reaches a terminal
    state (completed, failed, or cancelled). This is a convenience endpoint
    for clients that prefer a synchronous workflow.

    Note: This endpoint may take 20-60 minutes to complete for complex queries.
    Consider using the async workflow (POST + polling) for better control.

    Args:
        _current_user: Authenticated user (required for authorization).
        gemini: Injected GeminiService instance.
        request: Deep research request with query and optional parameters.

    Returns:
        GeminiDeepResearchResultResponse with final status and results.

    Raises:
        GeminiAPIError: If the job fails or polling exceeds max attempts.
    """
    job = await gemini.start_research(request)
    return await gemini.wait_for_completion(job.interaction_id)


@router.post("/deep-research", response_model=GeminiDeepResearchJobResponse)
async def start_deep_research(
    _current_user: CurrentUser,
    gemini: GeminiDep,
    request: GeminiDeepResearchRequest,
) -> Any:
    """Start a new deep research job.

    Submits a research query to the Gemini API and returns immediately with
    an interaction ID. Use the poll endpoint to check job status and retrieve
    results when complete.

    Args:
        _current_user: Authenticated user (required for authorization).
        gemini: Injected GeminiService instance.
        request: Deep research request with query and optional parameters.

    Returns:
        GeminiDeepResearchJobResponse with interaction_id and initial status.

    Raises:
        GeminiAPIError: If the API request fails for any reason.
    """
    return await gemini.start_research(request)


@router.get(
    "/deep-research/{interaction_id}",
    response_model=GeminiDeepResearchResultResponse,
)
async def poll_deep_research(
    _current_user: CurrentUser,
    gemini: GeminiDep,
    interaction_id: str,
    last_event_id: str | None = Query(default=None),
) -> Any:
    """Poll for deep research job status and results.

    Retrieves the current status and any available outputs from a running
    research job. The last_event_id parameter enables reconnection after
    network interruption, allowing clients to resume from where they left off.

    Args:
        _current_user: Authenticated user (required for authorization).
        gemini: Injected GeminiService instance.
        interaction_id: The interaction ID from job creation.
        last_event_id: Optional ID of last received event for reconnection.

    Returns:
        GeminiDeepResearchResultResponse with current status and outputs.

    Raises:
        GeminiAPIError: If the interaction is not found or polling fails.
    """
    return await gemini.poll_research(
        interaction_id=interaction_id,
        last_event_id=last_event_id,
    )


@router.delete("/deep-research/{interaction_id}")
async def cancel_deep_research(
    _current_user: CurrentUser,
    gemini: GeminiDep,
    interaction_id: str,
) -> dict[str, str]:
    """Cancel a running deep research job.

    Terminates a running research job. Returns successfully if the job was
    cancelled or was already in a terminal state.

    Args:
        _current_user: Authenticated user (required for authorization).
        gemini: Injected GeminiService instance.
        interaction_id: The interaction ID of the job to cancel.

    Returns:
        Success message confirming cancellation.

    Raises:
        GeminiAPIError: If the cancellation request fails.
    """
    await gemini.cancel_research(interaction_id)
    return {"message": "Research job cancelled successfully"}

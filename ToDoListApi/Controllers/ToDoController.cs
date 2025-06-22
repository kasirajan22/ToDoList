using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListApi.Models;
using ToDoListApi.Services;
using System.Security.Claims;
using ToDoListApi.Dtos;

namespace ToDoListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoRepository _repository;
        public ToDoController(IToDoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ToDoResponseDto>> GetAll()
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdValue, out int userId))
            {
                return Unauthorized();
            }
            var items = _repository.GetAll().Where(t => t.UserId == userId)
                .Select(t => new ToDoResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    CreatedAt = t.CreatedAt,
                    CompletedAt = t.CompletedAt
                });
            return Ok(items);
        }

        [HttpGet("{id}")]
        public ActionResult<ToDoResponseDto> Get(int id)
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdValue, out int userId))
            {
                return Unauthorized();
            }
            var item = _repository.Get(id);
            if (item == null || item.UserId != userId) return NotFound();
            var dto = new ToDoResponseDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                IsCompleted = item.IsCompleted,
                CreatedAt = item.CreatedAt,
                CompletedAt = item.CompletedAt
            };
            return Ok(dto);
        }

        [HttpPost]
        public ActionResult<ToDoResponseDto> Create(ToDoRequestDto dto)
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdValue, out int userId))
            {
                return Unauthorized();
            }
            var item = new ToDoItem
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                CompletedAt = dto.IsCompleted ? DateTime.UtcNow : null
            };
            var created = _repository.Create(item);
            var response = new ToDoResponseDto
            {
                Id = created.Id,
                Title = created.Title,
                Description = created.Description,
                IsCompleted = created.IsCompleted,
                CreatedAt = created.CreatedAt,
                CompletedAt = created.CompletedAt
            };
            return CreatedAtAction(nameof(Get), new { id = created.Id }, response);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ToDoRequestDto dto)
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdValue, out int userId))
            {
                return Unauthorized();
            }
            var existing = _repository.Get(id);
            if (existing == null || existing.UserId != userId) return NotFound();
            existing.Title = dto.Title;
            existing.Description = dto.Description;
            existing.IsCompleted = dto.IsCompleted;
            if (dto.IsCompleted && existing.CompletedAt == null)
            {
                existing.CompletedAt = DateTime.UtcNow;
            }
            else if (!dto.IsCompleted)
            {
                existing.CompletedAt = null;
            }
            _repository.Update(id, existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdValue, out int userId))
            {
                return Unauthorized();
            }
            var item = _repository.Get(id);
            if (item == null || item.UserId != userId) return NotFound();
            _repository.Delete(id);
            return NoContent();
        }
    }
}

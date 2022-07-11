<?php

namespace App\Entity;

use App\Repository\JobRepository;
use Doctrine\ORM\Mapping as ORM;

enum JobStatus: string 
{
    case OPEN = "open";
    case IN_PROGRESS = "in-progress";
    case COMPLETED = "completed";
    case CANCELLED = "cancelled";
}

#[ORM\Entity(repositoryClass: JobRepository::class)]
class Job
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 150)]
    private $summary;

    #[ORM\Column(type: 'string', length: 500)]
    private $description;

    #[ORM\Column(type: 'string', enumType: JobStatus::class)]
    private $status = JobStatus::OPEN;

    #[ORM\ManyToOne(targetEntity: Property::class, inversedBy: 'jobs')]
    #[ORM\JoinColumn(nullable: false)]
    private $property;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?JobStatus
    {
        return $this->status;
    }

    public function setStatus(JobStatus $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getProperty(): ?Property
    {
        return $this->property;
    }

    public function setProperty(?Property $property): self
    {
        $this->property = $property;

        return $this;
    }
}

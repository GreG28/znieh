<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GameObject
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\VillageGameBundle\Entity\GameObjectRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 */
abstract class GameObject
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    protected $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="points", type="integer", nullable=true)
     */
    protected $points;

    /**
     * @ORM\ManyToOne(targetEntity="Step", cascade={"persist"})
     */
    private $step;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return GameObject
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return GameObject
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set points
     *
     * @param integer $points
     * @return GameObject
     */
    public function setPoints($points)
    {
        $this->points = $points;
    
        return $this;
    }

    /**
     * Get points
     *
     * @return integer 
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set step
     *
     * @param \Znieh\VillageGameBundle\Entity\Step $step
     * @return GameObject
     */
    public function setStep(\Znieh\VillageGameBundle\Entity\Step $step = null)
    {
        $this->step = $step;
    
        return $this;
    }

    /**
     * Get step
     *
     * @return \Znieh\VillageGameBundle\Entity\Step 
     */
    public function getStep()
    {
        return $this->step;
    }
}
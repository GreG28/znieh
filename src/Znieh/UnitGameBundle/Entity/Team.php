<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Team
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UnitGameBundle\Entity\TeamRepository")
 * @ExclusionPolicy("all")
 */
class Team
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Expose
     */
    private $name;

    /**
    * @ORM\ManyToMany(targetEntity="Unit", mappedBy="teams")
    * @Expose
    */
    private $units;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="teams")
     */
    private $user;

    /**
     * @ORM\Column(name="selected", type="boolean", nullable=true)
     */
    private $selected;

    /**
     * @ORM\Column(name="save", type="boolean", nullable=true)
     */
    private $save;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->units = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     *
     * @return Team
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
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Team
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set selected
     *
     * @param boolean $selected
     *
     * @return Team
     */
    public function setSelected($selected)
    {
        $this->selected = $selected;
<<<<<<< HEAD
=======

>>>>>>> 0d4e71e8c986c6efd5b7279f4ac5a0fb1e88b72a
        return $this;
    }

    /**
     * Get selected
     *
     * @return boolean
     */
    public function getSelected()
    {
        return $this->selected;
    }

    /**
     * Set save
     *
     * @param boolean $save
     *
     * @return Team
     */
    public function setSave($save)
    {
        $this->save = $save;
<<<<<<< HEAD
=======

>>>>>>> 0d4e71e8c986c6efd5b7279f4ac5a0fb1e88b72a
        return $this;
    }

    /**
     * Get save
     *
     * @return boolean
     */
    public function getSave()
    {
        return $this->save;
    }

    /**
     * Add unit
     *
     * @param \Znieh\UnitGameBundle\Entity\Unit $unit
     *
     * @return Team
     */
    public function addUnit(\Znieh\UnitGameBundle\Entity\Unit $unit)
    {
        if ($this->units->contains($unit)) {
            return $this;
        }

        $unit->addTeam($this);
        $this->units[] = $unit;

        return $this;
    }

    /**
     * Remove unit
     *
     * @param \Znieh\UnitGameBundle\Entity\Unit $unit
     */
    public function removeUnit(\Znieh\UnitGameBundle\Entity\Unit $unit)
    {
        if (!$this->units->contains($unit)) {
            return $this;
        }

        $this->units->removeElement($unit);
        $unit->removeTeam($this);
    }

    /**
     * Get units
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUnits()
    {
        return $this->units;
    }
}

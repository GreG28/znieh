<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Unit
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UnitGameBundle\Entity\UnitRepository")
 * @ExclusionPolicy("all")
 */
class Unit
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
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     * @Expose
     */
    private $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetime")
     * @Gedmo\Timestampable(on="update")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="Sprite")
     * @Expose
     */
    private $sprite;

    /**
     * @ORM\ManyToOne(targetEntity="Sign")
     * @Expose
     */
    private $sign;

    /**
     * @ORM\ManyToOne(targetEntity="Size")
     * @Expose
     */
    private $size;

    /**
     * @ORM\ManyToOne(targetEntity="Weight")
     * @Expose
     */
    private $weight;

    /**
     * @ORM\ManyToOne(targetEntity="Weapon", cascade={"persist"})
     * @Expose
     */
    private $weapon;

    /**
     * @ORM\ManyToOne(targetEntity="Armor", cascade={"persist"})
     * @Expose
     */
    private $armor;

    /**
     * @ORM\ManyToMany(targetEntity="Team", inversedBy="units")
     */
    private $teams;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="units")
     */
    private $user;

    /**
     * @var integer
     *
     */
    private $cost;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->teams = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set cost
     *
     * @param integer $cost
     *
     * @return Unit
     */
    public function setCost($cost)
    {
        $this->cost = $cost;

        return $this;
    }

    /**
     * Get cost
     *
     * @return integer
     */
    public function getCost()
    {
        return $this->cost;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Unit
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Unit
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Unit
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set weapon
     *
     * @param \Znieh\UnitGameBundle\Entity\Weapon $weapon
     *
     * @return Unit
     */
    public function setWeapon(\Znieh\UnitGameBundle\Entity\Weapon $weapon = null)
    {
        $this->weapon = $weapon;

        return $this;
    }

    /**
     * Get weapon
     *
     * @return \Znieh\UnitGameBundle\Entity\Weapon
     */
    public function getWeapon()
    {
        return $this->weapon;
    }

    /**
     * Set armor
     *
     * @param \Znieh\UnitGameBundle\Entity\Armor $armor
     *
     * @return Unit
     */
    public function setArmor(\Znieh\UnitGameBundle\Entity\Armor $armor = null)
    {
        $this->armor = $armor;

        return $this;
    }

    /**
     * Get armor
     *
     * @return \Znieh\UnitGameBundle\Entity\Armor
     */
    public function getArmor()
    {
        return $this->armor;
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Unit
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
     * Set size
     *
     * @param \Znieh\UnitGameBundle\Entity\Size $size
     *
     * @return Unit
     */
    public function setSize(\Znieh\UnitGameBundle\Entity\Size $size = null)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return \Znieh\UnitGameBundle\Entity\Size
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set weight
     *
     * @param \Znieh\UnitGameBundle\Entity\Weight $weight
     *
     * @return Unit
     */
    public function setWeight(\Znieh\UnitGameBundle\Entity\Weight $weight = null)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight
     *
     * @return \Znieh\UnitGameBundle\Entity\Weight
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set sprite
     *
     * @param \Znieh\UnitGameBundle\Entity\Sprite $sprite
     *
     * @return Unit
     */
    public function setSprite(\Znieh\UnitGameBundle\Entity\Sprite $sprite = null)
    {
        $this->sprite = $sprite;

        return $this;
    }

    /**
     * Get sprite
     *
     * @return \Znieh\UnitGameBundle\Entity\Sprite
     */
    public function getSprite()
    {
        return $this->sprite;
    }

    /**
     * Set sign
     *
     * @param \Znieh\UnitGameBundle\Entity\Sign $sign
     *
     * @return Unit
     */
    public function setSign(\Znieh\UnitGameBundle\Entity\Sign $sign = null)
    {
        $this->sign = $sign;

        return $this;
    }

    /**
     * Get sign
     *
     * @return \Znieh\UnitGameBundle\Entity\Sign
     */
    public function getSign()
    {
        return $this->sign;
    }

    /**
     * Add teams
     *
     * @param \Znieh\UnitGameBundle\Entity\Team $team
     *
     * @return Unit
     */
    public function addTeam(\Znieh\UnitGameBundle\Entity\Team $team)
    {
        if ($this->teams->contains($team)) {
            return $this;
        }

        $this->teams[] = $team;
        return $this;
    }

    /**
     * Remove teams
     *
     * @param \Znieh\UnitGameBundle\Entity\Team $team
     */
    public function removeTeam(\Znieh\UnitGameBundle\Entity\Team $team)
    {
        if (!$this->teams->contains($team)) {
            return $this;
        }

        $this->teams->removeElement($team);
    }

    /**
     * Get teams
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTeams()
    {
        return $this->teams;
    }
}
